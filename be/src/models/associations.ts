// import { User } from "./User.js";
// import { Friendship } from "./Friendship.js";
// import { ChatRoom } from "./ChatRoom.js";
// import { RoomMember } from "./RoomMember.js";
// import { Message } from "./Message.js";

// export function setupAssociations() {
//   // Friendship
//   User.hasMany(Friendship, {
//     foreignKey: "userId",
//     as: "friendshipsA",
//   });

//   User.hasMany(Friendship, {
//     foreignKey: "friendId",
//     as: "friendshipsB",
//   });

//   Friendship.belongsTo(User, {
//     foreignKey: "userId",
//     as: "userA",
//   });

//   Friendship.belongsTo(User, {
//     foreignKey: "friendId",
//     as: "userB",
//   });

//   // User - RoomMember
//   User.hasMany(RoomMember, {
//     foreignKey: "userId",
//     as: "roomMemberships",
//   });

//   RoomMember.belongsTo(User, {
//     foreignKey: "userId",
//     as: "user",
//   });

//   // ChatRoom - RoomMember
//   ChatRoom.hasMany(RoomMember, {
//     foreignKey: "roomId",
//     as: "members",
//   });

//   RoomMember.belongsTo(ChatRoom, {
//     foreignKey: "roomId",
//     as: "room",
//   });

//   // User - ChatRoom
//   User.belongsToMany(ChatRoom, {
//     through: RoomMember,
//     foreignKey: "userId",
//     otherKey: "roomId",
//     as: "rooms",
//   });

//   ChatRoom.belongsToMany(User, {
//     through: RoomMember,
//     foreignKey: "roomId",
//     otherKey: "userId",
//     as: "users",
//   });

//   // ChatRoom - Message
//   ChatRoom.hasMany(Message, {
//     foreignKey: "roomId",
//     as: "messages",
//   });

//   Message.belongsTo(ChatRoom, {
//     foreignKey: "roomId",
//     as: "room",
//   });

//   // User - Message
//   User.hasMany(Message, {
//     foreignKey: "senderId",
//     as: "messages",
//   });

//   Message.belongsTo(User, {
//     foreignKey: "senderId",
//     as: "sender",
//   });
// }
