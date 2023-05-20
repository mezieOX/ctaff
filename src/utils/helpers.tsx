export function formatSubjects (subjects: string[]){
    let formattedString = '';

    if (subjects.length === 1) {
      formattedString = capitalize(subjects[0])
    }else if (subjects.length === 2) {
      formattedString = `${capitalize(subjects[0])} and ${capitalize(subjects[1])}`;
    } else if (subjects.length > 2) {
      const lastSubject = subjects.pop();
      const capitalizedSubjects = subjects.map(subject => capitalize(subject));
      formattedString = `${capitalizedSubjects.join(', ')} and ${capitalize(lastSubject)}`;
    } 

    return formattedString
  }

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
