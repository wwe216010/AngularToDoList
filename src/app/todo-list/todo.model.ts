export class Todo {
    Title: string = ''
    IsComplete: boolean = false;
    EditMode: boolean = false;

    get done(): Boolean{
        return this.IsComplete;        
    }

    get getEditMode(): boolean{
        return this.EditMode;
    }

    set setEditMode(res: boolean){
        this.EditMode = res;
    }

    toggleIsCompleted(): void{
        this.IsComplete = !this.IsComplete;
    }

    setTitle(title: string): void{
        this.Title = title;
    }
}
