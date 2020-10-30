export class CreateTodoDTO {
  public Title: string;
  public Description: string;
  public Status: boolean;
  public ExpirationDate: number;
  public AssignedUserIds: string[];
}
