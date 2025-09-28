'use strict';

class TemplateProcessor {
  constructor(template) {
    this.template = template;
  }

  fillIn(dictionary) {
    let output = this.template;

    // Replace placeholders with values from dictionary
    for (const key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        const placeholder = `{{${key}}}`;
        const value = dictionary[key];
        const regex = new RegExp(placeholder, 'g'); // safer than replaceAll
        output = output.replace(regex, value);
      }
    }

    // Remove any leftover placeholders that weren't matched
    output = output.replace(/{{.*?}}/g, '');

    return output;
  }
}
