#!/usr/bin/python3
'''generates output in html format with table list of some gigs setlist files.

USEFUL CLI COMMAND:
../create_setlist_html.py | tee setlists_created.html  | cut -b -$(tput cols)

For this you have to be in setlist folder !!

'''

# python standard libraries
import argparse
import glob
import logging
import os
import re

# 3rd party modules
import dominate
from dominate.util import raw
from dominate.tags import *


# vars
#======== ========= ========= ========= ========= ========= ========= =========
extensions = (
  '*.jpg',
  '*.pdf',
  '*.txt',
)
files_list = []
for ext in extensions:
  files_list.extend(glob.glob(ext))
files = sorted(files_list)

doc = dominate.document(title='beats united setlists')

HOME_DIR = os.path.expanduser('~')
WEB_DIR = f"{HOME_DIR}/git/agu/beatsunited/website"
HTML_FILE = f"{WEB_DIR}/setlists_created.html"

regex = r"([0-9]{4})([0-9]{2})([0-9]{2})_bu_setlist_(.+)_(.+)_(.+)\.(.*)"
regex_date = r"\3.\2.\1"
regex_city = r"\4"
regex_location = r"\5"
regex_event = r"\6"
regex_suffix = r"\7"


# args
#======== ========= ========= ========= ========= ========= ========= =========
def get_args():
  parser = argparse.ArgumentParser(
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description=f'''
"{os.path.basename(__file__)}" {__doc__}
    ''',
    epilog='2023',
  )
  # positional arguments.
  parser.add_argument('-v', '--verbose', help='verbose', action="store_const", dest="loglevel", const=logging.INFO)
  parser.add_argument('-d', '--debug', help='debug', action="store_const", dest="loglevel", const=logging.DEBUG)
  parser.add_argument('-Y', '--Run', '--Doit', action='store_true', default=False, help='really do something')
  return parser.parse_args()


# defs
#======== ========= ========= ========= ========= ========= ========= =========
def fu_blanks(a_cnt=3):
  for i in range(a_cnt):
    raw('&nbsp;')
  raw('-')
  for i in range(a_cnt):
    raw('&nbsp;')

# start
#======== ========= ========= ========= ========= ========= ========= =========
args = get_args()
if args.loglevel is not None:
  logging.basicConfig(level=args.loglevel)

with doc.head:
  link(rel='stylesheet', href='https://www.w3schools.com/w3css/4/w3.css')
  link(rel='stylesheet', href='bu.css')
  link(rel='icon', href='bu.ico')

with doc.body:
  attr(cls='w3-sans-serif w3-large bu-ukrain-yellow')
  with div(cls='w3-container'):
    # links
    with p(__pretty=False):
      attr(cls='w3-large')
      a('beatsunited.de', target='blank', title='Band Website', href='../website/index.html')
      fu_blanks()
      a('Songs Repertoire', target='blank', title='Artist, Song, BPM, time, etc.', href='https://docs.google.com/spreadsheets/d/1TzAiBhRINhIhF9fQB6d2GYXMYb055AujHxAAVYXFovQ/edit?usp=drive_link')

    with table():
      attr(cls='w3-table w3-bordered w3-hoverable w3-amber')
      # table header
      with tr():
        attr(cls='w3-orange')
        th('Datum', __pretty=False),
        th('Ort', __pretty=False),
        th('Location', __pretty=False),
        th('Veranstaltung', __pretty=False),
        th('Download', __pretty=False),
      # table main content
      for f in files:
        logging.debug(f"{f}")
        # set fields (table cells) out of filename
        date = re.sub(regex, regex_date, f)
        city = re.sub(regex, regex_city, f).replace('-', ' ')
        location = re.sub(regex, regex_location, f).replace('-', ' ')
        event = re.sub(regex, regex_event, f).replace('-', ' ')
        download = re.sub(regex, regex_suffix, f)
        if city.startswith("Munich"):
          city = "München"
        tr(
          td(date, __pretty=False),
          td(city, __pretty=False),
          td(location, __pretty=False),
          td(event, __pretty=False),
          td(a(download, href=f'setlists/{f}', target='_blank'), __pretty=False),
          __pretty=False
        )

logging.debug(doc)
logging.info(f"{type(doc)}")
logging.info(f"{HTML_FILE}")

if args.Run:
  with open(HTML_FILE, 'w') as file_descriptor:
    file_descriptor.write(str(doc))
