import { Component, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WeatherService } from '../../service/weather.service';
import { Title } from '@angular/platform-browser';

Chart.defaults.plugins.tooltip.backgroundColor = "rgb(60, 179, 113)";
Chart.defaults.plugins.tooltip.bodyColor = "rgb(0, 0, 0)";
Chart.defaults.plugins.tooltip.titleAlign = "center";
Chart.defaults.plugins.tooltip.bodyFont = {
  size: 14
}
Chart.defaults.font.size = 20;
Chart.defaults.font.weight = "bolder";

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  public loading = false;
  public chart:any;
  
  constructor(
    private readonly weatherService: WeatherService, 
    private readonly title: Title, 
    private elRef: ElementRef<HTMLElement>,
  ) {
    title.setTitle("Wisy | TOP");
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
      const data = res.geometry.coordinates[0];
      const labelData = res.properties.periods;
      const datasets: any[] = [];
      const labelDataset: any[] = [];
      const tempDataset: any[] = [];
      
      data.forEach((element: any) => {
        datasets.push({x: element[0], y: element[1]});
      });

      labelData.forEach((element: any) => {
        labelDataset.push(element.name);
        tempDataset.push(element.temperature);
      })

      const ctx = this.elRef.nativeElement.getElementsByClassName("line-chart")[0] as HTMLCanvasElement;
      
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labelDataset,
          datasets: [{
            data: tempDataset,
            label: "TOP Forecast",
            borderColor: 'rgb(60, 179, 113)',
            borderWidth: 1,
            backgroundColor: "rgb(60, 179, 113)",
          }]
        }
      })
    })
  }
}
