import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar'; 
import { Footer } from './components/footer/footer';
import { ConnectionErrorPopup } from './components/connection-error-popup/connection-error-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ConnectionErrorPopup],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-project');
}
