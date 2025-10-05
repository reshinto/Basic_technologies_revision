from proxy1 import Proxy, RealSubject

rs = RealSubject()
rs.request()

proxy = Proxy(rs)
proxy.request()
