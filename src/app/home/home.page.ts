import { Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };

  signaturePad: any;
  canvasWidth!: number;
  canvasHeight!: number;
  base64ToGallery: any;

  selectedFile!: File;
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      // Perform file upload logic here (e.g., send the file to a server)
      console.log('Uploading file:', this.selectedFile);
    } else {
      console.log('No file selected.');
    }
  }

  constructor(
    private router: Router,
    private elementRef: ElementRef,) { }

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 600;
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save(): void {
    const img = this.signaturePad.toDataURL();
    this.base64ToGallery.base64ToGallery(img).then(
      (      res: any) => console.log('Saved image to gallery ', res),
      (      err: any) => console.log('Error saving image to gallery ', err)
    );
  }

  isCanvasBlank(): any {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }


  btnSubmit() {    
    this.router.navigateByUrl('/');
  }

}