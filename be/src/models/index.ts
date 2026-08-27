/*
  현재는 User 모델만 있지만,
  앞으로 아래 모델을 추가하게 됩니다.

  import { Friendship } from "./Friendship";
  import { ChatRoom } from "./ChatRoom";
  import { RoomMember } from "./RoomMember";
  import { Message } from "./Message";
*/

/*
  이 파일의 목적은 모든 모델을 한 번에 불러오고
  모델 간 관계를 정의하는 것입니다.

  server.ts에서 이 파일을 import하면
  User 모델이 Sequelize에 등록됩니다.
*/

export { User } from "./User";
