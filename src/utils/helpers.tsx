export function formatSubjects(subjects: string[]) {
  let formattedString = "";

  if (subjects.length === 1) {
    formattedString = capitalize(subjects[0]);
  } else if (subjects.length === 2) {
    formattedString = `${capitalize(subjects[0])} and ${capitalize(
      subjects[1]
    )}`;
  } else if (subjects.length > 2) {
    const lastIdx = subjects.length - 1;
    const lastSubject = subjects[lastIdx];
    const capitalizedSubjects = subjects.map((subject: string, idx: number) => {
      if (idx === lastIdx) return null;
      return capitalize(subject);
    });
    formattedString = `${capitalizedSubjects.join(", ")} and ${capitalize(
      lastSubject
    )}`;
  }
  return formattedString;
}

export function goToDashBoardHome(router: any, dashboard: string) {
  let bPath = router.asPath;
  if (bPath !== `/dashboard/${dashboard}`)
    router.push(`/dashboard/${dashboard}`);
}

export function capitalize(string: string | undefined) {
  return (string ?? "").charAt(0).toUpperCase() + string?.slice(1);
}

export function getDayTime(setGreeting: any) {
  const now = new Date();
  const currhr = now.getHours();

  if (currhr < 12) setGreeting("Good Morning");
  else if (currhr < 18) setGreeting("Good Afternoon");
  else setGreeting("Good Evening");
}

export const cutText = (text: string) => {
  return text.slice(0, 50);
};

export function statusColorScheme(data){
  if(data === "available") return "green"
  else if(data === "unavailable") return "red"
  else if(data === "pending") return "yellow"
}