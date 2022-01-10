const URL_PREFIX = 'chrome-extension://'
const CHROME_EXTENSION_ID = 'pgbgjjpnamegjneochnocdnjehicdfal'

describe('Snapshot e2e testing', () => {
  beforeAll(async () => {
    await page.goto(`${URL_PREFIX}${CHROME_EXTENSION_ID}/popup.html`)
  })

  it('should be able to create an annotation on an existing snapshot', async () => {
    await page.waitForSelector('button.rounded-full')
    const createButtonIsDisabled = await page.$eval('button.rounded-full', (el) => el.disabled)
    expect(createButtonIsDisabled).toBe(true)

    await page.waitForSelector("button[title='Open Snapshot']")
    await page.click("button[title='Open Snapshot']")
    const target = await new Promise((resolve) => browser.once('targetcreated', resolve))

    const snapshotEditorPage = await target.page()
    await snapshotEditorPage.bringToFront()
    await snapshotEditorPage.waitForSelector('button')
    await snapshotEditorPage.click('button')
    await snapshotEditorPage.waitForTimeout(500)
    await snapshotEditorPage.click('div.flex.justify-end button')
    await snapshotEditorPage.waitForTimeout(500)
    const [x, y] = await snapshotEditorPage.evaluate(() => [
      document.documentElement.clientWidth / 2,
      document.documentElement.clientHeight / 2,
    ])
    await snapshotEditorPage.mouse.click(x, y)
    await snapshotEditorPage.waitForSelector("button[type='submit']")

    await snapshotEditorPage.click("div[data-placeholder='Title'] p")
    await snapshotEditorPage.keyboard.type('Filling in a simple Title', { delay: 5 })
    await snapshotEditorPage.click("div[data-placeholder='Description'] p")
    await snapshotEditorPage.keyboard.type(
      'Description explaining the violated accessibility guideline.',
      { delay: 5 }
    )
    await snapshotEditorPage.click("button[type='submit']")
    // todo assert that title is correct and description is correct
    // todo assert that the title element also has a tooltip title
    // todo

    await page.waitForSelector('zasd')
  })

  /* tests:
  - should be able to create an annotation on an existing snapshot
  - test options menu
  - test collaboration
   - in the setup phase, open the snapshot and delete all existing annotations
  * */
})
