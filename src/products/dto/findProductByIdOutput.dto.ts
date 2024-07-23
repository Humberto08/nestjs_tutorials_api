import { ApiProperty } from "@nestjs/swagger";

export class FindUserByIdOutputDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
