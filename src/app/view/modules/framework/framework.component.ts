import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salsah-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {

    // TODO: replace with @input object called 'add'
    add: any = {
        title: 'Add something',
        description: 'What does add mean?',
        method: 'This is a method defined in the child component'
    };

    data: any = {
        title: 'Your list',
        description: 'not yet implemented',
        list: []
    };

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // definition of the position for the preview (main module) and the detail view (sub module)
    position = {
        preview: 'left',            // top
        detail: 'right'             // bottom
    };

    // the size of the main module. It is large by default.
    // if the the new resource module or the edit resource module is active,
    // the size changes
    size: string = 'large';

    // the sub module of this component can contain
    // a) a form to create new stuff
    newItemIsActive: boolean = false;
    // AND / OR
    // b) a form to edit an item from the list
    editItemIsActive: boolean = false;

    // this component makes a http request (service)
    // if something's going wrong, we need an error message "container"
    errorMessage: string = undefined;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // id (almost the iri) of the selected person
    id: string;



  constructor() { }

  ngOnInit() {
  }

  newItem() {
      if (this.size === 'large') this.size = 'small';
      this.isLoadingSubModule = true;
      this.selectedRow = undefined;

      this.newItemIsActive = true;
      this.editItemIsActive = false;
      this.isLoadingSubModule = false;
  }

  editItem(id: string) {

  }

  sortList(key: string) {

  }

}
