# Pivotal Cloud Foundry (PCF)

## config.yaml

### example

```yaml
pcf_org: "orgname"
email: "myemail@email.com"
group_id: "com.company.org.repo-name"
postdeployment: false
dev:
  applications:
    - instances: 1
      memory: 512M
      health-check-type: "http"
      health-check-http-endpoint: "/api/v1/health"
      health-check-invocation-timeout: 30
      timeout: 30
      env:
        DEBUG: "False"
      services:
        - oauth2-cred
      buildpacks:
        - python_buildpack
  pcf_urls: ["api.dev.sys.cs.sgp.company.com"]
  pcf_credentials: "qqqfec763igfi2637gfi7623f623fi72fv23rfv27"
  pcf_spaces: "dev"
sit:
  applications:
    - instances: 1
      memory: 512M
      health-check-type: "http"
      health-check-http-endpoint: "/api/v1/health"
      health-check-invocation-timeout: 30
      timeout: 30
      env:
        DEBUG: "False"
      services:
        - oauth2-cred
      buildpacks:
        - python_buildpack
  pcf_urls: ["api.sit.sys.cs.sgp.company.com"]
  pcf_credentials: "qqqfec763igfi2637gfi7623f623fi72fv23rfv27"
  pcf_spaces: "sit"
uat:
  applications:
    - instances: 1
      memory: 512M
      health-check-type: "http"
      health-check-http-endpoint: "/api/v1/health"
      health-check-invocation-timeout: 30
      timeout: 30
      env:
        DEBUG: "False"
      services:
        - oauth2-cred
      buildpacks:
        - python_buildpack
  pcf_urls: ["api.uat.sys.cs.sgp.company.com"]
  pcf_credentials: "qqqfec763igfi2637gfi7623f623fi72fv23rfv27"
  pcf_spaces: "uat"
staging:
  applications:
    - instances: 3
      memory: 512M
      health-check-type: "http"
      health-check-http-endpoint: "/api/v1/health"
      health-check-invocation-timeout: 30
      timeout: 30
      env:
        DEBUG: "False"
      services:
        - oauth2-cred
      buildpacks:
        - python_buildpack
  pcf_urls:
    ["api.prod.sys1.cs.sgp.company.com", "api.prod.sys2.cs.sgp.company.com"]
  pcf_credentials: "qqqfec763igfi2637gfi7623f623fi72fv23rfv27"
  pcf_spaces: "staging"
prod:
  applications:
    - instances: 3
      memory: 512M
      health-check-type: "http"
      health-check-http-endpoint: "/api/v1/health"
      health-check-invocation-timeout: 30
      timeout: 30
      env:
        DEBUG: "False"
      services:
        - oauth2-cred
      buildpacks:
        - python_buildpack
  pcf_urls:
    ["api.prod1.sys.cs.sgp.company.com", "api.prod2.sys.cs.sgp.company.com"]
  pcf_credentials: "qqqfec763igfi2637gfi7623f623fi72fv23rfv27"
  pcf_spaces: "prod"
```

## Procfile

### example

```
web: gunicorn -k unicorn.workers.UvicornWorker src.main:app -t 300 -b 0.0.0.0:8080
```
