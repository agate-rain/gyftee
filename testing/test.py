# # import zerorpc
# from metamind.api import set_api_key, general_image_classifier

# set_api_key('Yq24ReyO4zWQOG7xIfQVpNMyKbPFL9SU3A6PNRj5qjlTPZsTox')

# class Classifier(object):
#   def printClassifier(self, name):
#     print general_image_classifier.predict(['http://bioexpedition.com/wp-content/uploads/2012/05/Brown_Bear.jpg', 'http://media.animevice.com/uploads/0/3695/465493-teddy_bear.jpg'], input_type='urls')

# # s = zerorpc.Server(Classifier())
# # s.bind("tcp://0.0.0.0:4242")
# # s.run()

from metamind.api import set_api_key, general_image_classifier

set_api_key('Yq24ReyO4zWQOG7xIfQVpNMyKbPFL9SU3A6PNRj5qjlTPZsTox')

print general_image_classifier.predict(['http://bioexpedition.com/wp-content/uploads/2012/05/Brown_Bear.jpg', 'http://media.animevice.com/uploads/0/3695/465493-teddy_bear.jpg'], input_type='urls')