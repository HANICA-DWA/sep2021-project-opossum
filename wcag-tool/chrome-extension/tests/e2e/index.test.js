const URL_PREFIX = 'chrome-extension://'
const CHROME_EXTENSION_ID = 'pgbgjjpnamegjneochnocdnjehicdfal'

const SLIDER_TRANSITION_DURATION = 1000
let firstTab
let secondTab

async function createAnnotation(page, title, description) {
  await page.click('div.flex.justify-end button')
  await page.waitForTimeout(SLIDER_TRANSITION_DURATION)
  const [x, y] = await page.evaluate(() => [
    document.documentElement.clientWidth / 2,
    document.documentElement.clientHeight / 2,
  ])
  await page.mouse.click(x, y)
  await page.waitForTimeout(SLIDER_TRANSITION_DURATION)

  await page.click("div[data-placeholder='Title'] p")
  await page.keyboard.type(title)
  await page.click("div[data-placeholder='Description'] p")
  await page.keyboard.type(description)
  await page.click("button[type='submit']")
  await page.waitForTimeout(SLIDER_TRANSITION_DURATION)
}

async function newTabDefaultState(page) {
  await page.bringToFront()
  await page.waitForSelector('button')
  await page.click('button')
  await page.waitForTimeout(SLIDER_TRANSITION_DURATION)
}

async function openExistingSnapshot() {
  await page.goto(`${URL_PREFIX}${CHROME_EXTENSION_ID}/popup.html`)
  await page.waitForSelector('button.rounded-full')
  const createButtonIsDisabled = await page.$eval('button.rounded-full', (el) => el.disabled)
  expect(createButtonIsDisabled).toBe(true)

  await page.waitForSelector("button[title='Open Snapshot']")
  await page.click("button[title='Open Snapshot']")
  const target = await new Promise((resolve) => browser.once('targetcreated', resolve))
  firstTab = await target.page()
  await newTabDefaultState(firstTab)
}

async function deleteExistingAnnotations() {
  const annotationSelector = '.slide-pane__content div.overflow-y-auto > div.cursor-pointer'
  let annotation = await firstTab.$(annotationSelector)

  while (annotation) {
    await firstTab.click(annotationSelector)
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await firstTab.click('.slide-pane__content button')
    await firstTab.waitForSelector('.tooltip-container button span.trashIcon')
    await firstTab.click('.tooltip-container button span.trashIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    annotation = await firstTab.$(annotationSelector)
  }
}

describe('e2e crud annotations', () => {
  beforeAll(async () => {
    await openExistingSnapshot()
    await deleteExistingAnnotations()
  })

  it('should create an annotation', async () => {
    const title = 'Filling in a simple Title'
    const description = 'Description explaining the violated accessibility guideline.'
    await createAnnotation(firstTab, title, description)

    const actualTitle = await firstTab.$eval('.slide-pane__title p', (el) => el.innerText)
    const actualDescription = await firstTab.$eval(
      '.slide-pane__content .annotation-details p',
      (el) => el.innerText
    )
    // expected title and description
    expect(actualTitle).toBe(title)
    expect(actualDescription).toBe(description)

    const actualTitleTooltip = await firstTab.$eval('.slide-pane__title p', (el) => el.title)
    // expected title tooltip
    expect(actualTitleTooltip).toBe(title)
  })

  it('should edit an annotation by selecting an annotation rule', async () => {
    await firstTab.click('.slide-pane__title button.pencilIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await firstTab.click('.slide-pane__content select.appearance-none')
    await firstTab.waitForTimeout(200)
    await firstTab.keyboard.press('ArrowDown')
    await firstTab.keyboard.press('Enter')
    await firstTab.click('.slide-pane__content svg.cursor-pointer')
    await firstTab.click("button[type='submit']")
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)

    const actualTitle = await firstTab.$eval('.slide-pane__title p', (el) => el.innerText)

    // expected title
    expect(actualTitle).not.toBe('Filling in a simple Title')
  })

  it('should delete annotation', async () => {
    await firstTab.click('.slide-pane__content button')
    await firstTab.waitForSelector('.tooltip-container button span.trashIcon')
    await firstTab.click('.tooltip-container button span.trashIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)

    const annotation = await firstTab.$(
      '.slide-pane__content div.overflow-y-auto > div.cursor-pointer'
    )
    expect(annotation).toBeNull()
  })

  afterAll(async () => {
    await firstTab.close()
  })
})

describe('e2e Collaboration', () => {
  beforeAll(async () => {
    await openExistingSnapshot()
    await deleteExistingAnnotations()
  })

  it('should check for new annotation in annotation list collaborative', async () => {
    secondTab = await browser.newPage()
    const secondTabUrl = await firstTab.url()
    await secondTab.goto(secondTabUrl)
    await newTabDefaultState(secondTab)

    await firstTab.bringToFront()

    await createAnnotation(
      firstTab,
      'Collaboration Annotation',
      'Description explaining the violated accessibility guideline.'
    )
    await firstTab.click('button.crossIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await secondTab.bringToFront()

    const titleAnnotation = await secondTab.$eval(
      '.slide-pane__content .overflow-y-auto p',
      (el) => el.innerText
    )
    // expected title
    expect(titleAnnotation).toBe('Collaboration Annotation')
  })

  it('should count annotations in annotation list', async () => {
    await firstTab.bringToFront()
    await createAnnotation(
      firstTab,
      'Collaboration Annotation 2',
      'Description explaining the violated accessibility guideline.'
    )

    await secondTab.bringToFront()
    const annotationCount = await secondTab.$eval(
      '.slide-pane__content .overflow-y-auto',
      (el) => el.children.length
    )
    expect(annotationCount).toBe(2)
  })

  it('should count annotations in list after deleting an annotation', async () => {
    await firstTab.bringToFront()
    await firstTab.click('.slide-pane__content button')
    await firstTab.waitForSelector('.tooltip-container button span.trashIcon')
    await firstTab.click('.tooltip-container button span.trashIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)

    await secondTab.bringToFront()

    const annotationCount = await secondTab.$eval(
      '.slide-pane__content .overflow-y-auto',
      (el) => el.children.length
    )
    expect(annotationCount).toBe(1)
  })

  it('should check if annotation title changed on detailslider', async () => {
    await secondTab.click('.slide-pane__content div.overflow-y-auto > div.cursor-pointer')
    await secondTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await firstTab.bringToFront()
    await firstTab.click('.slide-pane__content div.overflow-y-auto > div.cursor-pointer')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await firstTab.click('.slide-pane__title button.pencilIcon')
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)
    await firstTab.click("div[data-placeholder='Title'] p")
    await firstTab.keyboard.type(' Changed')
    await firstTab.click("button[type='submit']")
    await firstTab.waitForTimeout(SLIDER_TRANSITION_DURATION)

    await secondTab.bringToFront()
    const actualTitle = await secondTab.$eval('.slide-pane__title p', (el) => el.innerText)
    expect(actualTitle).toBe('Collaboration Annotation Changed')
  })

  afterAll(async () => {
    await firstTab.close()
    await secondTab.close()
  })
})
