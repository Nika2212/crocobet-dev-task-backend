export class UpdateTodoDTO {
  public Id: string;
  public Title: string;
  public Description: string;
  public Status: boolean;
  public ExpirationDate: number;
  public AssignedUserIds: string[];
}
