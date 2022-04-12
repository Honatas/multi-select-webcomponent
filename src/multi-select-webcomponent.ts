export default class MultiselectWebcomponent extends HTMLElement {

  options: HTMLOptionElement[] = [];
  searchbox: HTMLInputElement = document.createElement('input');
  dropdown: HTMLDivElement = document.createElement('div');
  selected: HTMLDivElement = document.createElement('div');
  buttons: HTMLDivElement = document.createElement('div');

  constructor() {
    super();

    // Keeping options
    this.querySelectorAll('option').forEach(option => this.options.push(option.cloneNode(true) as HTMLOptionElement));

    // Search input
    this.searchbox.type = 'text';
    this.searchbox.className = `msw-searchbox ${this.getAttribute('searchbox') || ''}`;
    this.searchbox.style.flexGrow = '1';
    this.searchbox.style.border = '0';
    this.searchbox.style.outline = 'none';
    this.searchbox.addEventListener('keyup', (e) => this.onSearchboxKeyup(e));

    // Selected
    this.selected.className = `msw-selected ${this.getAttribute('selected') || ''}`;
    this.selected.style.display = 'flex';
    this.selected.style.flexWrap = 'wrap';
    this.selected.style.flexGrow = '1';

    // Buttons
    this.buttons.style.display = 'flex';

    // Dropdown
    this.dropdown.className = `msw-dropdown ${this.getAttribute('dropdown') || ''}`;
    this.dropdown.style.display = 'none';
    this.dropdown.style.width = '100%';
    this.dropdown.style.position = 'absolute';
    this.dropdown.style.zIndex = '2';
    this.dropdown.addEventListener('click', () => this.onDropdownClick());

    // Structure
    this.style.display = 'flex';
    this.style.alignItems = 'center';
    this.style.height = 'max-content';
    this.innerHTML = '';
    this.appendChild(this.selected);
    this.appendChild(this.buttons);
    this.parentNode?.insertBefore(this.dropdown, this.nextSibling);
    // Events
    this.addEventListener('click', () => this.onMultiselectClick());
    this.parentElement?.addEventListener('mouseleave', () => this.dropdown.style.display = 'none');

    // Build
    this.build();
  }

  get value(): string[] | undefined {
    const ret = [];
    for (const option of this.options) {
      if (option.selected) {
        ret.push(option.value);
      }
    }
    return ret;
  }

  set disabled(value: boolean) {
    this.searchbox.disabled = value;
    this.build();
  }

  public build(): void {
    this.selected.innerHTML = '';
    this.dropdown.innerHTML = '';
    this.buttons.innerHTML = '';
    for (const option of this.options) {
      if (option.selected) {
        this.selected.appendChild(this.buildSelectedItem(option));
      } else {
        this.dropdown.appendChild(this.buildDropdownItem(option));
      }
    }
    this.selected.appendChild(this.searchbox);
    if (this.dropdown.innerHTML !== '') {
      this.buttons.appendChild(this.buildSelectAllButton());
    }
    if (this.selected.querySelectorAll('.msw-selecteditem').length > 0) {
      this.buttons.appendChild(this.buildClearButton());
    }
    this.dispatchEvent(new Event('change'));
  }

  private buildSelectedItem(option: HTMLOptionElement): HTMLDivElement {
    const item = document.createElement('div');
    item.style.userSelect = 'none';
    item.style.webkitUserSelect = 'none';
    item.className = `msw-selecteditem ${this.getAttribute('selecteditem') || ''}`;
    item.innerHTML = option.textContent as string;
    item.dataset.value = option.value;
    if (!this.searchbox.disabled) {
      item.addEventListener('click', (e) => this.onSelectedClick(e));
    }
    return item;
  }

  private buildDropdownItem(option: HTMLOptionElement): HTMLDivElement {
    if (this.getAttribute('item')) {
      console.warn('[MultiSelectWebcomponent]: Use of attribute "item" is deprecated - it shall be removed in next versions. Use "dropdownitem" instead.');
    }
    const item = document.createElement('div');
    item.style.userSelect = 'none';
    item.style.webkitUserSelect = 'none';
    item.className = `msw-dropdownitem ${this.getAttribute('dropdownitem') || this.getAttribute('item') || ''}`;
    item.innerHTML = option.textContent as string;
    item.dataset.value = option.value;
    item.addEventListener('click', (e) => this.onItemClick(e));
    return item;
  }

  private buildClearButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = `msw-clearbutton ${this.getAttribute('clearbutton') || ''}`;
    const buttonSpanClass = this.getAttribute('clearbuttonspan');
    if (buttonSpanClass == null) {
      button.textContent = 'C';
    } else {
      const span = document.createElement('span');
      span.className = `msw-clearbuttonspan ${buttonSpanClass}`;
      button.appendChild(span);
    }
    const buttonTitle = this.getAttribute('clearbuttontitle');
    button.title = buttonTitle ? buttonTitle : 'Clear Selection';
    button.addEventListener('click', (e) => this.onClearClick(e));
    button.disabled = this.searchbox.disabled;
    return button;
  }

  private buildSelectAllButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = `msw-selectallbutton ${this.getAttribute('selectallbutton') || ''}`;
    const buttonSpanClass = this.getAttribute('selectallbuttonspan');
    if (buttonSpanClass == null) {
      button.textContent = 'A';
    } else {
      const span = document.createElement('span');
      span.className = `msw-selectallbuttonspan ${buttonSpanClass}`;
      button.appendChild(span);
    }
    const buttonTitle = this.getAttribute('selectallbuttontitle');
    button.title = buttonTitle ? buttonTitle : 'Select All';
    button.addEventListener('click', (e) => this.onSelectAllClick(e));
    button.disabled = this.searchbox.disabled;
    return button;
  }

  private findOptionByValue(value: string | undefined): HTMLOptionElement | undefined {
    for (const option of this.options) {
      if (value === option.value) {
        return option;
      }
    }
  }

  private chooseOption(option: HTMLOptionElement | undefined): void {
    if (option) {
      option.selected = true;
    }
    this.searchbox.value = '';
    this.build();
  }

  private onItemClick(e: Event): void {
    this.chooseOption(this.findOptionByValue((e.currentTarget as HTMLElement).dataset.value));
  }

  private onSelectedClick(e: Event): void {
    const option = this.findOptionByValue((e.currentTarget as HTMLElement).dataset.value);
    if (option) {
      option.selected = false;
    }
    this.build();
  }

  private onClearClick(e: Event): void {
    this.options.forEach(option => option.selected = false);
    this.build();
    this.searchbox.value = '';
    this.searchbox.focus();
    e.stopPropagation();
  }

  private onSelectAllClick(e: Event): void {
    this.options.forEach(option => option.selected = true);
    this.build();
    this.dropdown.style.display = 'none';
    this.searchbox.value = '';
    this.searchbox.focus();
    e.stopPropagation();
  }

  private onMultiselectClick(): void {
    if (this.searchbox.disabled === true) return;
    this.dropdown.style.display = 'block';
    this.searchbox.focus();
  }

  private onDropdownClick(): void {
    this.searchbox.focus();
  }

  private onSearchboxKeyup(e: KeyboardEvent): void {
    if ((e.key === 'Enter' || e.key === 'NumpadEnter') && this.searchbox.value !== '' && this.dropdown.firstChild) {
      this.chooseOption(this.findOptionByValue((this.dropdown.firstChild as HTMLElement).dataset.value));
      this.searchbox.focus();
      return;
    }
    this.dropdown.innerHTML = '';
    if (this.searchbox.value === '') {
      for (const option of this.options) {
        if (!option.selected) {
          this.dropdown.appendChild(this.buildDropdownItem(option)); // build with all
        }
      }
    } else {
      for (const option of this.options) {
        if (!option.selected && option.textContent && option.textContent.toLocaleUpperCase().indexOf(this.searchbox.value.toLocaleUpperCase()) >= 0) {
          this.dropdown.appendChild(this.buildDropdownItem(option)); // build with search results
        }
      }
    }
    this.dropdown.style.display = 'block';
  }
}
