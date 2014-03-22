import re
import sys

def display_math_matcher(match):
  st = match.group(1)
  st = re.sub(r'<br\s*/>', '', st)
  st = st.strip()
  return '\n\\[\n' + st + '\n\\]\n'

def format_common(c):
  c = re.sub(r'&#47;', r'/', c)
  c = re.sub(r'"/blog', '"', c)

  c = re.sub(r'/book/link.php\?id=(\w+)', r'{% amazon \1 %}', c)
  c = re.sub(r'/book/(\w+).jpg', r'{% bookcover \1 %}', c)
  
  return c

def format_header(c):
  c = re.sub(r'layout: post', r'layout: wppost', c)

  for key in ['status', 'published', 'author_login', 'author_email', 'author_url', 'wordpress_id', 'wordpress_url']:
    c = re.sub(r'^' + key + r':\s*\S+\s*', '', c, flags=re.M)
  
  return format_common(c)

def format_body(c):
  c = re.sub(r'(<p>\s*)?<span id="[^"]*"></span>(\s*</p>)?', '<span></span>', c)

  c = re.sub(r'(?:\s*<br\s*/>)?\s*\\\[(.*)\\\](?:\s*<br\s*/>)?\s*', display_math_matcher, c, flags=re.M|re.S)

  return format_common(c)

with open(sys.argv[1], 'r') as in_file:
  c = in_file.read()
  
  sections = c.split('---', 3)
  
  header = format_header(sections[1])
  
  body = format_body(sections[2])
  
  c = '---'.join(['', header, body])

with open(sys.argv[2], 'w') as out_file:
  out_file.write(c)

