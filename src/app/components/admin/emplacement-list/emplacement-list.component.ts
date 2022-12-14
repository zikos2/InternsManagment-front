import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cilCheckCircle, cilPencil, cilTrash, cilX, cilZoom } from '@coreui/icons';
import { EmplacementStage } from 'src/app/entities/EmplacementStage';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'emplacement-list',
  templateUrl: './emplacement-list.component.html',
  styleUrls: ['./emplacement-list.component.scss']
})
export class EmplacementListComponent implements OnInit {
  icons = { cilZoom, cilCheckCircle, cilX ,cilPencil,cilTrash};
  isAddModalVisible = false;
  isDeleteModalVisible=false;
  isUpdateModalVisible = false;
  selectedEmplacement:any= {id:null,nom:"", adresse:"",ville:""}
  selectedID:any={id:null}
  empls: any = [];
  currentPage: number = 1;
  itemsCount: number = 0;

  search=false;
  searchTerm = new FormControl('');
  constructor(private adminService : AdminService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmpl(this.currentPage - 1);
  }
  getEmpl(page: number): void{
    this.adminService.getEmpl(page).subscribe((emplacements)=>{
      this.empls=emplacements.content;

    })
  }
  emplPageChanged($event: number) {
    if (this.search) {
      this.searchEmpl($event - 1);
    } else {
      this.getEmpl($event - 1);
    }
    this.currentPage = $event;
    console.log($event);
  }
  searchEmpl(page:number){
    this.adminService.searchEmpl(this.searchTerm.value as string,page).subscribe((empls:any) => {

      this.empls = empls.content;
      this.itemsCount = empls.totalElements;

    });

  }
  toggleAddModal(event: any) {
    this.isAddModalVisible = event;
  }
  toggleDeleteModal(event: any) {
    this.isDeleteModalVisible = event;
  }

  toggleUpdateModal(event: any) {
    this.isUpdateModalVisible = event;
  }
  onClickSubmit(data: {
    nom: string; adresse: string;ville:string
}) {
  const empl:EmplacementStage ={nom:data.nom,adresse:data.adresse,ville:data.ville}

  this.adminService.createEmpl(empl).subscribe((res) => {
    console.log(res);
    this.router.routeReuseStrategy.shouldReuseRoute= () => false;
       this.router.onSameUrlNavigation='reload';
       this.router.navigate(['./'],{relativeTo: this.route})
       this.isAddModalVisible=false;
  });;
  }
  showCreation(){
    console.log("clicked");
    this.isAddModalVisible=true;
  }
  showEmplUpdateForm(empl:EmplacementStage){
    this.selectedEmplacement.id=empl.id;
    this.selectedEmplacement.nom=empl.nom;
    this.selectedEmplacement.adresse=empl.adresse;
    this.selectedEmplacement.ville=empl.ville;

    this.isUpdateModalVisible=true;
  }
  showEmplDeleteForm(id:number){
   this.selectedID.id=id;
   this.isDeleteModalVisible=true;
  }
   onClickUpdate(data: {
    nom: string; adresse: string;ville:string; id:number


}){
  const empl:EmplacementStage ={nom:data.nom,adresse:data.adresse,ville:data.ville,id:data.id}

    this.adminService.updateEmpl(empl).subscribe((res)=>{
    this.router.routeReuseStrategy.shouldReuseRoute= () => false;
       this.router.onSameUrlNavigation='reload';
       this.router.navigate(['./'],{relativeTo: this.route})
       this.isUpdateModalVisible=false;});;

   }
   cancel(){
  this.isDeleteModalVisible=false;
   }
   deleteEmpl(id:number){
    this.adminService.deleteEmpl(id).subscribe((res)=>{

       this.router.routeReuseStrategy.shouldReuseRoute= () => false;
       this.router.onSameUrlNavigation='reload';
       this.router.navigate(['./'],{relativeTo: this.route})
       this.isDeleteModalVisible=false;})

   }

}
