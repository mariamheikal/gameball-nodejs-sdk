
//Gameball exception thrown when a status code other than 200 is returned.
class GameballException extends Error{
  constructor(message, code) {
    super(message)
  this.message = message
  this.code=code
}
}

module.exports={

  GameballException
}

