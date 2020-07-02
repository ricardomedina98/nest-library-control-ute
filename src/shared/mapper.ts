import { UserEntity } from "src/modules/user/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";



export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email, details, createdAt, updatedAt  } = data;
    
    let userDto: UserDto = {
      id,
      username,
      email,
      deitals: {
        id: details.id,
        name: details.name,
        firstName: details.firstName,
        secondName: details.secondName
      },
      createdAt,
      updatedAt
    };
  
    return userDto;
  };