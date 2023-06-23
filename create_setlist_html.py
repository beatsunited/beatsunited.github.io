#!/usr/bin/python3

# python standard libraries
import glob
import re

# 3rd party modules
import dominate
from dominate.tags import *

# vars
#======== ========= ========= ========= ========= ========= ========= =========
files = sorted(glob.glob('setlists/*.pdf'))

doc = dominate.document(title='beats united setlists')

regex = r".+([0-9]{4})([0-9]{2})([0-9]{2})_bu_setlist_(.+)_(.+)_(.+)\.(.*)"
regex_date = r"\3.\2.\1"
regex_city = r"\4"
regex_location = r"\5"
regex_event = r"\6"
regex_suffix = r"\7"

# start
#======== ========= ========= ========= ========= ========= ========= =========
with doc.head:
  link(rel='stylesheet', href='https://www.w3schools.com/w3css/4/w3.css')
  link(rel='stylesheet', href='bu.css')
  link(rel='icon', href='bu.ico')

with doc.body:
  attr(cls='w3-sans-serif w3-large bu-ukrain-yellow')
  with div(cls='w3-container'):
    with table():
      attr(cls='w3-table w3-bordered w3-hoverable w3-amber')
      with tr():
        attr(cls='w3-orange')
        # table header
        th('Datum', __pretty=False),
        th('Ort', __pretty=False),
        th('Location', __pretty=False),
        th('Veranstaltung', __pretty=False),
        th('Download', __pretty=False),

      # table main content
      for f in files:
        date = re.sub(regex, regex_date, f)
        city = re.sub(regex, regex_city, f)
        location = re.sub(regex, regex_location, f)
        event = re.sub(regex, regex_event, f).replace('-', ' ')
        download = re.sub(regex, regex_suffix, f)
        tr(
          td(date, __pretty=False),
          td(city, __pretty=False),
          td(location, __pretty=False),
          td(event, __pretty=False),
          td(a(download, href=f'{f}'), __pretty=False),
          __pretty=False
        )

    # footer links
    with p(__pretty=False):
      attr(cls='w3-xlarge w3-center')
      a('beatsunited.de', target='blank', href='https://beatsunited.de')
    with p(__pretty=False):
      attr(cls='w3-xlarge w3-center')
      a('Repertoire', target='blank', href='https://docs.google.com/spreadsheets/d/1TzAiBhRINhIhF9fQB6d2GYXMYb055AujHxAAVYXFovQ/edit?usp=drive_link')

print(doc)
