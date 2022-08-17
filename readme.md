## prerequisites
### for running in containers
Make sure all files and folders have access rights set to the world as well,
otherwise it will show an `403 forbidden` error msg in the browser.

### Cloudflare DNS
removed records
type| name                                | value
----|------------------------------------ | -----------------------------------------------------------------------------
TXT | _dmarc                              | v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:beatsunited@gmx.de
TXT | *._domainkey                        | v=DKIM1; p=
TXT | beatsunited.de                      | v=spf1 -all
TXT | _github-pages-challenge-beatsunited | 1dce0d422cc4526d1a4f65d25f3968

Saved it here cuz unsure about it, don't remember if it was alphahosting or Cloudflare settings!  
The last one is for sure Cloudflare, but I think it's only initially needed.


NO, these records except the last one you can let Cloudflare create
to protect an existing email system from spoofing etc. !!
