import "./style.css";

// interfaces
interface HasFormatter {
  format(): string;
}

// class
class Invoice implements HasFormatter {
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }

  format(): string {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}

class Payment implements HasFormatter {
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }

  format(): string {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}

class ListTemplate {
  constructor(private container: HTMLUListElement) {}

  render(item: HasFormatter, heading: string, pos: "start" | "end") {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    h4.innerHTML = heading;
    li.append(h4);
    const p = document.createElement("p");
    p.innerHTML = item.format();
    li.append(p);

    if(pos === 'start'){
      this.container.prepend(li);
    }else if(pos === 'end'){
      this.container.append(li);
    }

  }
}

// form
const form = document.querySelector(".new-item-form") as HTMLFormElement;

// inputs
const type = document.querySelector("#type") as HTMLSelectElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

//event submit
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let doc: HasFormatter;
  if (type.value === "invoice") {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
  }

  console.log(doc);
});
