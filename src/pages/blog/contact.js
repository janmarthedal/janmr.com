import React from "react"

import BlogPage from "../../components/blog-page"

const Contact = () => (
  <BlogPage>
    <h2>Contact</h2>
    <p>
      Feel free to reach out using this form. It can be about a blog post or just
      a general comment. If you provide an email address, I will get back to you.
    </p>
    <form
      name="contact"
      action="/blog/"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Don’t fill this out:{" "}
          <input name="bot-field" />
        </label>
      </div>
      <div>
        <label htmlFor="name">Your name</label>
        <input id="name" required type="text" name="name" />
      </div>
      <div>
        <label htmlFor="email">Your email (optional)</label>
        <input id="email" type="email" name="email" />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required style={{ height: "5em" }}></textarea>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  </BlogPage>
)

export default Contact
