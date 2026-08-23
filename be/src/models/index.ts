import { User } from "./User.js";
import { Friendship } from "./Friendship.js";
import { ChatRoom } from "./ChatRoom.js";
import { RoomMember } from "./RoomMember.js";
import { Message } from "./Message.js";
import { setupAssociations } from "./associations.js";

setupAssociations();

export { User, Friendship, ChatRoom, RoomMember, Message };
