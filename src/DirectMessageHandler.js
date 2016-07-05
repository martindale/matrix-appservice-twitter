var log  = require('npmlog');
var RemoteRoom = require("matrix-appservice-bridge").RemoteRoom;

var DirectMessage = function (bridge, twitter) {
  this._bridge = bridge;
  this.twitter = twitter;
}


DirectMessage.prototype.processInvite = function (event, request, context) {
  return;//No invites
}

DirectMessage.prototype.processMessage = function (event, request, context) {
    //this.twitter.send_matrix_event_as_tweet(event,context.senders.remote,context.rooms.remote);
    if(event.content.msgtype == "m.text"){
      this.twitter.send_dm(event.sender,event.room_id,event.content.body);
    }
}

DirectMessage.prototype.processEvent = function (event, request, context) {
  // if(event.type == "m.room.aliases" && event.sender.startsWith("@twitbot")){
  //   this.twitter.add_hashtag_feed(
  //     context.rooms.remote.roomId.substr("hashtag_".length),
  //     context.rooms.matrix,
  //     context.rooms.remote
  //   );
  // }
}

DirectMessage.prototype.processAliasQuery = function(name){
  log.info("Handler.DirectMessage","Got alias request");
  console.log(name);
  return null;
  // var botID = this._bridge.getBot().getUserId();
  //
  // var remote = new RemoteRoom("hashtag_" + name);
  // remote.set("twitter_type", "hashtag");
  // this._bridge.getRoomStore().setRemoteRoom(remote);
  //
  // opts = {
  //     visibility: "public",
  //     room_alias_name: "twitter_#"+name,
  //     name: "[Twitter] #"+name,
  //     topic: "Twitter feed for #"+name,
  //     initial_state: [
  //         {
  //             "type": "m.room.join_rules",
  //             "content": {
  //                 "join_rule": "public"
  //             },
  //             "state_key": ""
  //         }
  //     ]
  // };
  // return {
  //     creationOpts: opts,
  //     remote: remote
  // };
}

module.exports = {
    DirectMessageHandler: DirectMessage
}