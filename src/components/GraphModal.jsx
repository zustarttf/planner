import "./GraphModal.css"
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import graph_black_img from "./../assets/graph_black_img.svg"

// 차트에서 사용할 요소 등록
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraphModal = ({ closeModal, loginFilterData, filterWorkOutData }) => {
    const [barData, setBarData] = useState({
        labels: ["10%", "30%", "50%", "70%", "90%", "100%"], // 가로축
        datasets: [
            {
                label: "",
                data: [], // 세로축
                backgroundColor: [
                    "rgba(253, 86, 95, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 223, 76, 0.8)",
                    "rgba(173, 217, 173, 0.8)",
                    "rgba(135, 206, 250, 0.95)",
                    "rgba(147, 112, 219, 0.95)",
                ],
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                hoverBorderColor: "#fff",
                hoverBorderWidth: 3,
            },
        ],
    });

    const [circleData, setCircleData] = useState({
        labels: ["유산소", "무산소"],
        datasets: [
            {
                data: [30, 20],
                backgroundColor: ["skyblue", "pink"],
                hoverOffset: 4,
                borderWidth: 2,
            },
        ],
    });

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "'Roboto', sans-serif",
                        weight: "bold",
                    },
                    color: "#6c757d",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    font: {
                        family: "'Roboto', sans-serif",
                    },
                    color: "#6c757d",
                },
                grid: {
                    color: "#e9ecef",
                    lineWidth: 1,
                },
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#fff",
                borderWidth: 1,
                bodyFont: {
                    size: 14,
                },
                // Tooltip을 더 보기 좋게 하기 위한 설정
                callbacks: {
                    title: (tooltipItem) => {
                        return `${tooltipItem[0].label} 의 만족도`;  // 툴팁 제목을 변경
                    },
                    label: (tooltipItem) => {
                        return `비율: ${tooltipItem.raw}%`;  // 툴팁 내용을 좀 더 구체적으로
                    },
                },
            },
            legend: {
                display: false,  // 색상 박스를 숨기기 위해 설정
                labels: {
                    font: {
                        family: "'Roboto', sans-serif",
                        weight: "bold",
                    },
                    color: "#6c757d",
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#fff",
                borderWidth: 1,
                bodyFont: {
                    size: 14,
                },
                // Tooltip을 더 보기 좋게 하기 위한 설정
                callbacks: {
                    title: (tooltipItem) => {
                        return `${tooltipItem[0].label}`;  // 유산소 / 무산소
                    },
                    label: (tooltipItem) => {
                        return `${tooltipItem.raw}분`;  // 운동 시간 표시
                    },
                },
            },
            legend: {
                position: "top",
                labels: {
                    font: {
                        family: "'Roboto', sans-serif",
                        weight: "bold",
                    },
                    color: "#6c757d",
                },
            },
        },
    };

    // 플랜 데이터 세팅
    useEffect(() => {
        if (loginFilterData) {
            const counts = [1, 2, 3, 4, 5, 6].map(emotionId => {
                return loginFilterData.filter(data => data.emotionId === emotionId).length;
            });
            // console.log("emotionCounts", counts);

            // barData의 data를 업데이트
            setBarData(prevData => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: counts,
                    },
                ],
            }));
        }
    }, [loginFilterData]);

    // 운동 데이터 세팅
    useEffect(() => {
        if (filterWorkOutData) {
            const yesOxygenHours = filterWorkOutData
                .filter((item) => item.yes_oxygen_hour)
                .reduce((total, item) => total + item.yes_oxygen_hour, 0);
            const yesOxygenMinutes = filterWorkOutData
                .filter((item) => item.yes_oxygen_minute)
                .reduce((total, item) => total + item.yes_oxygen_minute, 0);

            const totalYesOxygenMinutes = yesOxygenHours * 60 + yesOxygenMinutes;

            const noOxygenHours = filterWorkOutData
                .filter((item) => item.no_oxygen_hour)
                .reduce((total, item) => total + item.no_oxygen_hour, 0);
            const noOxygenMinute = filterWorkOutData
                .filter((item) => item.no_oxygen_minute)
                .reduce((total, item) => total + item.no_oxygen_minute, 0);

            const totalNoOxygenMinutes = noOxygenHours * 60 + noOxygenMinute;
            // console.log("체크체크", totalYesOxygenMinutes, totalNoOxygenMinutes);

            setCircleData(prevData => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: [totalYesOxygenMinutes, totalNoOxygenMinutes],
                    },
                ],
            }));
        }
    }, [filterWorkOutData]);

    return (
        <div className="modal">
            <div className="modal-content modal-enter">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <div style={{display:'flex', alignItems: 'center', gap:'10px', fontSize:'18px'}}>
                    <img src={graph_black_img} alt="" />
                    <div>그래프 분석</div>
                </div>
                <div className='just_line'></div>
                <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
                    <h3 className="chart-title">플랜 만족도 비율</h3>
                    <div className="bar-chart-container">
                        <Bar data={barData} options={barOptions} />
                    </div>
                    <h3 className="chart-title">유산소 / 무산소 비율</h3>
                    <div className="pie-chart-container">
                        <Pie data={circleData} options={pieOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphModal;
