# Separation Of Concerns (SOC)

- this one is meant to help you group functions or modules into a service
- The point being if you’re designing a system that deals with several concepts, you want to group your functions into modules depending on what they have to deal with

## Example

- consider a blogging platform, a simple one, where your users can publish their blog posts
- You could have a single system taking care of everything (user management, blog posts, analytics, and so on)
- But if you want to follow the SOC principle, you could end up with something more in the lines of the following

  ![SOC](../images/soc.png)

  - This is of course a very crude representation of the architecture, but the point being you can separate different responsibilities into different modules, this in turn allows for benefits such as
    - Scaling individual functionalities becomes easier
      - You can now easily consider scaling your user management module, because it is getting too much traffic, while leaving the rest of the platform untouched
    - Making changes is easier now that your code is not tightly coupled
      - You can make considerable modifications to how you manage blog posts without affecting any other section of the platform
    - Your platform is now more stable
      - If one of these modules crashes, then the system can potentially still function, with less features, of course, but the potential is there nevertheless

- SOC can also apply to API design, library architecture and more
  - It’s simply about having control over how you group functionalities in a way that makes sense to the users of those functionalities
