import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'salsah-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {

    // TODO: replace with @input object called 'add'
    /*
    add: any = {
        title: 'Add something (add.title)',
        description: 'What does add mean? (add.description)',
        method: 'This is a method defined in the child component'
    };
    */
    @Input('add') add: any;

    // TODO: replace with @Input object called 'data'
    /*
    data: any = {
        title: 'Your list (data.title)',
        description: 'not yet implemented (data.description)',
        list: [

        ]
    };
    */
    @Input('data') data: any;

    // TODO: replace with @Input string called 'title'
    title: string = 'Framework for everything';

    // TODO: replace with @Input array called 'sort'
    sort: any = [
        {
            key: 'lastname',
            label: 'Last name'
        },
        {
            key: 'firstname',
            label: 'First name'
        }
    ];
    sortTitle: string = 'Sort by: ';
    sortKey: string = this.sort[0].key;
    sortLabel: string = this.sort[1].label;

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
      console.log(this.data.list);
      console.log(this.data.type);
//      let list: this.data.type[] = this.data.list;
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
      if (key === this.sort[0].key) {
          this.sortKey = this.sort[1].key;
          this.sortLabel = this.sort[0].label;
      }
      else {
          this.sortKey = this.sort[0].key;
          this.sortLabel = this.sort[1].label;
      }
  }

}
