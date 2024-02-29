import { Component, ElementRef } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-lwx',
  standalone: true,
  imports: [],
  templateUrl: './lwx.component.html',
  styleUrl: './lwx.component.css'
})
export class LwxComponent {
  public loading = false;
  public chart:any;
  
  constructor(
    private readonly weatherService: WeatherService, 
    private readonly title: Title, 
    private elRef: ElementRef<HTMLElement>,
  ) {
    title.setTitle("Wisy | LWX");
    (async () => {
      this.loadWeather();
    })()
  }

  public setLoading(status: boolean) {
    this.loading = status;
  }

  protected async loadWeather() {
    this.setLoading(true);
    const observable = await this.weatherService.weatherInfo("https://api.weather.gov/gridpoints/TOP/31,80/forecast");
    observable.subscribe((res: any) => {
      this.setLoading(false);
      const labelData = res.properties.periods;
      const datasets: any[] = [];
      const labelDataset: any[] = [];
      const tempDataset: any[] = [];

      labelData.forEach((element: any) => {
        labelDataset.push(element.name);
        tempDataset.push(element.temperature);
      })

      const ctx = this.elRef.nativeElement.getElementsByClassName("line-chart")[0] as HTMLCanvasElement;
      
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelDataset,
          datasets: [{
            data: tempDataset,
            label: "LWX Forecast",
            borderColor: 'rgb(60, 179, 113)',
            borderWidth: 1,
            backgroundColor: "rgb(60, 179, 113)",
          }]
        }
      })
    })
  }
}
