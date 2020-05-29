mutation reg{
  UserUpsert(user:{
    login:"AntipMen", password:"ghbdtn1017", nick:"AntipMen"
  }){
    _id
  }
}

query login($login: String, $password: String){
   login(login: $login, password: $password)
}

query users{
  UserFind(query: "[{}]") {
_id
       login
    chats {
      _id
      owner {
        _id
                login
             }
      title
      messages {
        text
      }
    }
  }
}

query OneUser($user: String){
  UserFindOne(query: $user) {
    _id
    login
    chats {
      _id
      owner {
        login
      }
      title
      messages {
        text
      }
      
    }
  }
}

query media{
  MediaFind(query: "[{}]"){
    _id
    owner {
      _id
      nick
    }
    text
    url
    type
    messages {
      _id
      createdAt
      text
    }
  }
}

query chF{
  ChatFind(query: "[{}]"){
    _id
    owner {
      _id
     login
      nick
    }
     }
}

query mesF{
  MessageFind(query: "[{}]") {
    _id
    owner {
      _id
      login
    }
    chat {
      _id
      title
    }
    text
  }
}

mutation newChat{
  ChatUpsert(chat: {
    title: "community"
          }) {
    _id
    createdAt
    title
  }
}

mutation chatId{
  ChatUpsert(chat: {
    _id: "5ea005ced265602706d735d3"
    messages: {
      text: "hi"
    }
  }) {
    _id
    createdAt
    title
  }
}


query foc{
  ChatFindOne(query: "[{\"_id\":\"5ea1ed0bd265602706d735e4\"}]") {
 _id
    title
    owner {
      login
    }
    messages {
      _id
      createdAt
      text
    }
}
}

query mesAll{
  MessageFind(query: "[{\"___owner\":\"5e97105693e2915e617c6fc1\"}]") {
    chat {
      title
      _id
    }
    text
    
  }
}

query mesOne{
  MessageFindOne(query:"[{\"___owner\":\"5e97105693e2915e617c6fc1\"}]" ){
    chat {
      title
      _id
    }
    text
  }
}

mutation MesRed{
  MessageUpsert (message: {
    text: "Hi people. It's me - Anna.",
    chat: {
      _id: "5ea326cfd265602706d735f3"
    },
  }){
    _id
    text
    chat {
      _id
      createdAt
      title
    }
  }
}

