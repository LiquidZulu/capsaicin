#!/usr/bin/env python3

'''

1. Create captions for the audio file
  R - get captions for the audio file
  T - none
  L - export capions to srt file

2. Turn those captions into a series of png images
  R - read srt file for captions
  T - generate PNG images of captions
  L - write PNG images to file

'''

class Application:
    def __init__(self, GenCaptionRead, GenCaptionLoad, ConvertRead, ConvertLoad):

        if GenCaptionRead is None:
            raise ValueError('GenCaptionRead not provided')
        if GenCaptionLoad is None:
            raise ValueError('GenCaptionLoad not provided')

        if ConvertRead is None:
            raise ValueError('ConvertRead not provided')
        if ConvertLoad is None:
            raise ValueError('ConvertLoad not provided')

        self.GenCaptionRead = GenCaptionRead
        self.GenCaptionLoad = GenCaptionLoad
        self.ConvertRead = ConvertRead
        self.ConvertLoad = ConvertLoad
