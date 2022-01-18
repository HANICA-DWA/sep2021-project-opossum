# XPath vs CSS selector

**The problem that needs to be solved:** To programmatically select an element on a web page, while considering the next two conditions:

- The web page is dynamic and 'live'. When we refresh and there is different content I want my annotations to point to the same element as before even if it changed position.
- The web page is static because we created a 'snapshot' and the content will always be in the same position.

The possible solutions we will look at:

- XPath
- CSS selector

## CSS selector

### Advantages:

- CSS selectors are more readable for humans
- CSS selectors are faster*

*according to the sources, but results in our own demo on a simple web page conclude that XPath is faster.

### Disadvantages:

- Less options for building a selector for a specific element

## XPath

### Advantages:

- You can traverse both ways from any node. Both to a child node aswell as a parent node. CSS selectors can only traverse to child nodes.
- You can add conditional logic, for example: `//button[starts-with(@id, 'save') and contains(@class,'publish')]`

### Disadvantages

- XPath engines differ from browser to browser which makes them inconsistent
- XPath selectors can become really complex, which makes them difficult to read

## Conclusion

There were two use cases to consider:

- annotating on static web pages we call 'snapshots'
- annotating on dynamic 'live' web pages

Both of them satisfy the first use cases and have options to programmatically generate a selector that will always uniquely identify an element on the page considering it won't change.

Unfortunately neither of the options are capable of satisfying the second use case. The options to generate a selector aren't advanced enough to generate a selector that will identify an element regardless of where it is on the page with a 100% certainty.

The achieve the above mentioned problem in the second use case you are mainly depending on the following: does the element have an attribute or combination of attributes with values that can uniquely identify it?

Consider the following element on a web page:

`<input type="submit">`

The only unique attributes it has right now are the position on the page and the value `submit` in the `type` attribute. The position on the page might change when refreshing, so this is not an option. Even if there is only one button with `type="submit"` on the page right now, this might also change when refreshing. There is no possible way to guarantee that the selector that is created for this element will point to the same element after refreshing. 

Consider the following element on a web page:

`<input type="submit" id="submitSubscribe" value="Subscribe">`

This element has an `id` attribute that can be used to uniquely identify it assuming that the value in `id` is not programmatically generated and different every time. Even then the element could be gone from the web page when refreshing which will ofcourse make the annotation not show up as well. 

Consider the following element on a web page:

`<input type="submit" id="submit_334350" value="Subscribe">`

Assuming the value in `id` is programmatically generated and changes every refresh. If you would use this to value to generate a selector it would be useless since it won't point to anything on the next refresh. A valid solution could be to take the path that is not dynamic and use it to select the element, that would look something like this in XPath: `//input[starts-with(@id, ‘submit_’)]`. This is not programmatically possible yet and will need the input of a human to determine which part of the value is dynamic and which part is static.

Considering all these things it's incredibly hard to accurately annotate a live web page and expect all the annotations to point to the same elements when refreshing. There might be a solution possible where you use a combination of human input and XPath to generate selectors that could work on dynamic web pages. This would require further research to know for sure.

The conclusion for now is to use XPath when dealing with 'snapshots' because it has the same or better performance than CSS selectors, has more options to generate unique selectors and we might need it when expanding to annotating dynamic web pages.

## sources:

- https://exadel.com/news/how-to-choose-selectors-for-automation-to-make-your-life-a-whole-lot-easier

- https://www.jadeglobal.com/blog/ways-locate-dynamic-web-elements-selenium

- Our own demo
