import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterCount',
})
export class LetterCountPipe implements PipeTransform {
  transform(value: string): string {
    return `${value.trim().split(/\s+/).join().length}`;
  }
}
