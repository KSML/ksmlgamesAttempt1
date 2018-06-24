the startUI class after extracting the various info from
the user returns one of the various game classes such as hearts, texas etc
it passes as props these 3 functions in addition to the variable "playerName"

read(start,len):
  returns the content of the gamefile starting at the char start char
  and with length len, if the length is too long, no error is given
  it just returns a shorter string then expected
  if the start is larger than the file length it returns an empty string
  is len is negative the behaviour is undefined

append(input):
  appends the input to the gamefile

clear():
  sets the gamefile to an empty string

other notes:
  the gamefile has a max length (I can't remember what I set it too)
  (I'll update this readme once I take the time to look up what I set it to)
  its fairly big if I remember correctly (or at least it should be)
  so don't worry about it to much however just know that its a thing
  if you append to the gamefile and it gets to long it returns an error











