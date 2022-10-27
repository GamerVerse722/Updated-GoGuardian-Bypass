# GoGuardian Bypass

## A successful attempt to bypass GoGuardian.

GoGuardian is a pretty flawed piece of software. It has been bypassed many times in the past, however all of those bypasses lead up to this. A working GoGuardian bypass that runs completely on the client.
(Well, CORS is a thing, so it's not perfect, that's why the website in this repo has a compatibility mode checkbox, which uses google translate)

*This bypass is a sole proof-of-concept showing just how flawed GoGuardian is. It's literally the most incompetent piece of paid software I may have ever seen.
Not only can it be bypassed using a few lines of code, but it can also be outright stopped from sending data to the teachers to track what you're doing, by using AdGuard DNS (94.140.14.14).
This is a POC showing how flawed GoGuardian is for the price, and how other, much less expensive, if not, free, options are much better.* (from the website)
COMPATIBILITY MODE WAS FIXED BY GOOGLE, SOWWY :rage3:
## Alright, cool. How does it work.

Just to clarify this is the source that i found out this is possible and added my own moddification
https://github.com/ech0devv/GoGuardian-Bypass

![Website Looks](Screenshot 2022-10-27 081804.png)

iframes. Or, for the less technical of you, embedding a website into another. You see, GoGuardian blocks websites, however can't block embedded ones (big brain move from the devs).

## What's the code for it?


Here's a very basic example of how it works:

```html
<!DOCTYPE html>
<html>
  <body>
    <iframe src='YOUR URL'></iframe>
  </body>
</html>
```
