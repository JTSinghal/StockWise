from newsapi.newsapi_client import NewsApiClient
from dateutil.parser import parse
from datetime import datetime, timedelta
from newspaper import Article
from aylienapiclient import textapi
import sys
#from sklearn.feature_extraction.text import CountVectorizer
import json

#Init
aylienClient = textapi.Client("47822742", "42618f78948f5de16a1ebf108cc70e0c")
api = NewsApiClient(api_key='625cab7a9f8740d98b1dd97496894f3f')


#get user input based on what's on search box and what's on 



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

    savenum = 0
    for i in before_all_articles['articles']:
        if (stock in i["title"]):
            savenum = savenum + 1
            pastNews.append(i['url'])
            thisjson["headline" + str(savenum)] =  i["title"]
            thisjson["url" + str(savenum)] = i['url']
    for i in after_all_articles['articles']:
        if (stock in i["title"]):
            savenum = savenum + 1
            afterNews.append(i['url'])
            thisjson["headline"+ str(savenum)] =  i["title"]
            thisjson["url" + str(savenum)] = i['url']
    return pastNews, afterNews



def concatBody(arrayOfURLs):
    returnedConcat = ''
    for i in arrayOfURLs:
        print(i)
        article = Article(i)
        article.download()
        article.parse()
        returnedConcat += article.text
    return returnedConcat




def aylienSentimentCalc(textToAnalyze):
    sentiment = aylienClient.Sentiment({'text' : textToAnalyze})
    thisjson['subjectivity'] = sentiment['subjectivity']
    thisjson['polarity'] = sentiment['polarity']
    thisjson['confidence'] = sentiment['polarity_confidence']
    return "This was a " + sentiment['subjectivity'] + "ly " + sentiment['polarity'] + " stock and time, with a confidence of " + str(sentiment['polarity_confidence']) + "."


#def vectorize(fullbody):
#    vectorizer = CountVectorizer()
#    vec = vectorizer.fit_transform(fullbody)
#    return vectorizer, vec


thisjson = {}


print(aylienSentimentCalc(concatBody(getNews(sys.argv[1], sys.argv[2])[0])))
jsonret = json.dumps(thisjson)
print(jsonret)

#vectorizerret = vectorize(concatBody(getNews('Facebook', '17 Oct 2018')[0]))[0]
#vecreturn = vectorize(concatBody(getNews('Facebook', '17 Oct 2018')[0]))[1]
#print(vecreturn.toarray())





#print(aylienSentimentCalc('John is a very good football player!'))