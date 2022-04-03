# Internet Information Services
## terminal commands
* stop services
```
iisreset/stop
```

* start services
```
iisreset/start
```

* reset services
```
iisreset
```

* view existing configured sites
```
cd c:\Windows\System32\inetsrv
appcmd list site
```

* create new website (id starts from 1, must be unique)
```
cd c:\Windows\System32\inetsrv
appcmd add site /name:"Default Web Site" /id:1 /physicalPath:C:\production\dispatcher\website /bindings:http/*:81:websiteaddress.com
```

* delete website
```
cd c:\Windows\System32\inetsrv
appcmd delete site "Default Web Site"
```
