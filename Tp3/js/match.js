class Match {
    constructor(id, homeTeam, visitorTeam, date, score) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.score = score;
        this.visitorTeam = visitorTeam;
        this.date = date;
        this.getVainqueurLooser();
    }

    getVainqueurLooser() {
        if (this.score[0] > this.score[1]) {
            this.vainqueur = this.homeTeam;
            this.looser = this.visitorTeam;
        } else if (this.score[0] < this.score[1]) {
            this.vainqueur = this.visitorTeam;
            this.looser = this.homeTeam;
        } else {
            this.vainqueur = "Égalité";
        }
    }
}