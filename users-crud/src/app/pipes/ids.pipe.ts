import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "ids"
})
export class IdsPipe implements PipeTransform {
  transform(value: any): any {
    let ids = []
    for (let id in value) {
      ids.push(id)
    }
    return ids
  }
}
