the startUI class after extracting the various info from
the user returns one of the various game classes such as hearts, texas etc
it passes as props these four functions in addition to the variables "playerName"
and "master" (a boolean). The idea of the master boolean is so that
you can have one player that behaves differently than the others
(ie. you only want one player to deal the cards)
the master is whoever started the game (the person who did "create game"
rather than "join game")
I choose to change this to "master" from "dealer" because
some games have the dealer move around and master is a constant
(its in props and everything in props is constant if I understand correctly)

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

quit():
  quits the game

other notes:
  the gamefile has a max length (I can't remember what I set it too)
  (I'll update this readme once I take the time to look up what I set it to)
  its fairly big if I remember correctly (or at least it should be)
  so don't worry about it to much however just know that its a thing
  if you append to the gamefile and it gets to long it returns an error
  also when you start a game the gamefile should be empty
  (if its not, thats on me and I should fix it)
  also you shouldn't have to worry about the name of the gamefile
  or the password or table name or any of that, it should all be
  handled by the startUI
  Also each gamefile should start with the name of the game (eg. hearts)
  so that if a new player joins a game they know what game it is
  (I am building the startUI with this assumption in place)










