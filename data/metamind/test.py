from metamind.api import set_api_key, general_image_classifier

set_api_key('aXZxkB3eOMupDZSMNIZSdfD9hxv2zBDpen8qbMOOPLtzYwhx2X')

print general_image_classifier.predict(['https://scontent.xx.fbcdn.net/hphotos-xft1/t31.0-8/p180x540/1799935_10153379041592500_4858712342770219261_o.jpg', 'https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/q83/p720x720/945268_10151610992317500_1182525900_n.jpg?oh=377f8509b6dd5353d6f47205405a7df8&oe=566DD49C'], input_type='urls')
