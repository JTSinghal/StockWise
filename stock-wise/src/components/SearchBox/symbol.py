import urllib.request, json, sys

def convertCompany():
    with urllib.request.urlopen("http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=" + sys.argv[1] + "&region=1&lang=en") as url:
        data = json.loads(url.read().decode())
        return data["ResultSet"]["Result"][0]["symbol"]

print(convertCompany())
sys.stdout.flush()