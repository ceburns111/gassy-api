import {Table, Column, Model, HasMany, Unique, AllowNull, NotEmpty} from "sequelize-typescript";

@Table
class User extends Model<User> {
  
  @Unique
  @AllowNull(false)
  @NotEmpty
  @Column
  username: string;

  @Unique
  @AllowNull(false)
  @NotEmpty
  @Column
  email : string;

  @HasMany(() => message)
  messages?: message[];

  async findByLogin(login: string) {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };
  
}

export default User; 
