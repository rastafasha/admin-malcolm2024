import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorreoysubService } from '../services/correoysub.service';
import { Location } from '@angular/common';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-subc-list',
  templateUrl: './subc-list.component.html',
  styleUrls: ['./subc-list.component.scss']
})
export class SubcListComponent implements OnInit {

  subcripcions:any = [];
  isLoading: any = null;
  search:any= null;
  state:any= null;

  private http: HttpClient;

  constructor(
    public correoysubService: CorreoysubService,
    public modalService: NgbModal,
    private location: Location,
    private fileSaver: FileSaverService,
    handler: HttpBackend,
  ) { 
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.isLoading = this.correoysubService.isLoading$;
    this.listarCorreos();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  listarCorreos(){
    this.correoysubService.listSubcripciones().subscribe(
      (res:any)=>{
        console.log(res);
        this.subcripcions = res.subcripcions;
        // console.log(this.COURSES);
      }
    )
  }

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.listarCorreos();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.subcripcions);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "subcripcionMalcolmRegistrosDb")

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.listarCorreos();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.subcripcions);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "subcripcionMalcolmRegistrosDb")

  }

}
