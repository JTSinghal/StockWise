from newsapi.newsapi_client import NewsApiClient
from dateutil.parser import parse
from datetime import datetime, timedelta

#Init
api = NewsApiClient(api_key='625cab7a9f8740d98b1dd97496894f3f')

def getNews(stock, day):
    pastNews = []
    afterNews = []
    formatDay = parse(day) #Current Day
    dayMinusOne = formatDay - timedelta(days=1) #News from previous day
    dayPlusOne = formatDay + timedelta(days=1) #News from next day
    before_all_articles = api.get_everything(q=stock,
                                        from_param=str(dayMinusOne),
                                        to=str(formatDay),
                                        language='en',
                                        sources='abc-news, associated-press, australian-financial-review, bbc-news, bloomberg, business-insider, bussiness-insider-uk, cnbc, cnn, financial-times, financial-post, fortune, nbc-news, newsweek, the-economist, the-new-york-times, time, usa-today',                                       
                                        sort_by='popularity',
                                        )
    after_all_articles = api.get_everything(q=stock,
                                        from_param=str(formatDay),
                                        to=str(dayPlusOne),
                                        language='en',                                        
                                        sources='abc-news, associated-press, australian-financial-review, bbc-news, bloomberg, business-insider, bussiness-insider-uk, cnbc, cnn, financial-times, financial-post, fortune, nbc-news, newsweek, the-economist, the-new-york-times, time, usa-today',
                                        sort_by='popularity',
                                        )
    for i in before_all_articles['articles']:
        if (stock in i["title"]):
            pastNews.append(i)
    for i in after_all_articles['articles']:
        if (stock in i["title"]):
            afterNews.append(i)
    return pastNews, afterNews

print(getNews('UnitedHealth', '17 Oct 2018'))
        
