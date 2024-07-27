function updateCountdown() {
    const targetDate = new Date("2024-07-30T00:00:00");
    const now = new Date();
    const timeDifference = targetDate - now;
  
    if (timeDifference <= 0) {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      return;
    }
  
    // const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    // document.getElementById("months").innerText = String(months).padStart(2, "0");
    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").innerText = String(seconds).padStart(
      2,
      "0"
    );
  }
  
  setInterval(updateCountdown, 1000);
