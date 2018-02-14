import { Component, Input } from '@angular/core';

@Component({
  selector: 'lyli-metric',
  template: `
    <span class="mr-2 text-nowrap">
      <small class="text-muted">{{ metricName }}:</small> {{ metricValue }}
    </span>
  `,
})
export class MetricComponent {
  @Input() metricName: string;
  @Input() metricValue: number;
}
