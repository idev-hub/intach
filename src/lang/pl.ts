export default {
    pl: {
        scene: {
            data_update: {
                start: "Do normalnego działania bota musisz wejść do swojej grupy.\n",
                enter_group: "Wprowadź swoją grupę.",
                success: "Gratulacje!\n" +
                    "Teraz możesz w pełni korzystać z bota.",
                end: "W swoim harmonogramie wpisz „Dzisiaj” lub „Jutro”."
            }
        },
        button: {
            today: "Dzisiaj",
            tomorrow: "Jutro",
            after_tomorrow: "Pojutrze",
            detail: "Więcej szczegółów",
            week: "Na tydzień",
            other: "Inny",
            call_admins: "Administracja telefoniczna",
            reference: "Pomoc dla botów",
            ads: "Pomoc w pisaniu prac",
            prev: "Powrót do harmonogramu",
            see: "Popatrz",
            reset_data: "Reset danych",
            unsubscribe: "Anuluj subskrypcję wiadomości",
            subscribe: "subskrybuj wiadomości",
            start: "Zacząć",
            game: "grać"
        },
        ads: "Pilna pomoc dla studentów w pisaniu prac.\n\n" +
            "Zaochnik proces zamawiania prac. Dość proste. Następnie Twój osobisty asystent znajdzie odpowiedniego eksperta, sprawdzi, czy zadanie zostanie wykonane na czas, a po dokonaniu płatności przekaże Ci pracę\n\n" +
            "Będziesz mógł śledzić postęp zadania 24 godziny na dobę. Korekty wykonanej pracy są wykonywane bezpłatnie\n\n" +
            "Zaletą usługi jest obecność formalnej umowy pomiędzy firmą a klientem. To gwarancja poważnego podejścia do Twoich zobowiązań, a Twoje zamówienie zostanie zrealizowane z wysoką jakością i na czas.\n\n" +
            "Zobacz ceny -> https://vk.cc/aAOc4w",
        call_admins: {
            caused: "Administracja spieszy się z pomocą!\n" +
                "Proszę się spodziewać",
            error: "Przepraszamy, wystąpił błąd i wiadomość nie została dostarczona.\n\n" +
                "Spróbuj ponownie później"
        },
        newsletter: {
            subscribed: "Pomyślnie zasubskrybowałeś wiadomości dotyczące bota.",
            unsubscribed: "Zrezygnowałeś z subskrypcji wiadomości dotyczących botów."
        },
        actual: "Uzyskaj aktualny harmonogram bezpośrednio w swoich osobistych wiadomościach na VKontakte!",
        timetable: {
            start: "⭕ Wyszukiwanie harmonogramu ⭕",
            end: "⭕ Harmonogram się skończył ⭕",
            discipline: "Dyscyplina: ",
            teacher: "Nauczyciel: ",
            num: "Para: №",
            cabinet: "gabinet."
        },
        other: (context) => {
            let template = "Inne możliwości:\n\n"

            template += "📌 Potrzebujesz pomocy przy bocie?\n" +
                "Kliknij „Pomoc dla bota” i otworzy się artykuł z opisem bota, jego komendami i możliwościami. Pomoc zawiera również odpowiedzi na popularne pytania.\n\n"

            template += "🆘 Mieć problemy? A może chcesz zasugerować dobry pomysł na bota?\n \n" +
                "Kliknij „Zarządzanie połączeniami”, a my odpowiemy.\n\n"

            template += "⛔ Czy popełniłeś błąd podczas wprowadzania danych? Chcesz zmienić grupę\n\n" +
                "Kliknij „Resetuj dane”.\n\n"

            if(!context.isChat){
                if (context.user.subscribe.param) {
                    template += "🚀 Nie chcesz już być świadomy wszystkich nowości dotyczących botów?\n" +
                        "Kliknij przycisk „Anuluj subskrypcję wiadomości”\n\n"
                } else {
                    template += "🚀 Czy chcesz być świadomy wszystkich nowości dotyczących botów?\n" +
                        "Kliknij przycisk „Subskrybuj wiadomości” i jako pierwszy dowiesz się o nowościach grupy i aktualizacjach botów.\n\n"
                }
            }

            return template
        },
        not_found: "Nie znaleziono",
        spam: "⚠ Ostrzegamy. ⚠ \n\n" +
            "Mogą blokować spam.\n" +
            "Przed powtórzeniem tej samej prośby upewnij się, czy jej potrzebujesz, ponieważ odpowiedź na to samo żądanie nie ulegnie zmianie\n\n" +
            "Jeśli bot nie prześle Ci harmonogramu, sprawdź poprawność swoich danych. Aby zmienić dane - napisz „Start”.\n\n" +
            "Jeśli jesteś pewien, że wszystko się zgadza, a strona ma harmonogram na wybrany dzień, napisz do naszej administracji, postaramy się pomóc"
    },
    name: "Польский"
}
