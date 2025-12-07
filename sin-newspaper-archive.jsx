import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const SinNewspaperArchive = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interviewTabs, setInterviewTabs] = useState([]);
  const [expandedTab, setExpandedTab] = useState(null);
  const audioRef = useRef(null);
  const interviewTimerRef = useRef(null);

  // 16개 신의 실제 데이터 - 포스터 레이아웃 기준 재배치
  const sinLayers = [
    { 
      id: 1, 
      year: 1938, 
      newspaper: '동아일보', 
      date: '1938.11.20', 
      era: '일제강점기',
      image: 'sin1.png', 
      x: 12, y: 12,  // 좌상단 - 가장 오래된, 매우 흐림
      opacity: 0.08, 
      rotation: -3, 
      scale: 0.75,
      typeface: '산세리프 단순화, 한자 기반의 한글',
      context: '일제의 검열이 심했던 시기, 일본제 약 광고 속 글자',
      driveUrl: 'https://drive.google.com/open?id=1DA8ItBH7jLTJyYFoUIG9FXTcorkwiXXl'
    },
    { 
      id: 2, 
      year: 1964, 
      newspaper: '경향신문', 
      date: '1964.05.20', 
      era: '산업화/군사정권',
      image: 'sin2.png', 
      x: 18, y: 25,  // 좌측 중상단
      opacity: 0.12, 
      rotation: 2, 
      scale: 0.8,
      typeface: '불규칙적인 한자 레터링',
      context: '해방 직후, 검열이 심한 시기 아직 한자에서 벗어나지 못한 고유명사',
      driveUrl: 'https://drive.google.com/open?id=1oRTPf06jS1rG-5gdWy0D2cMrlCxp0cCR'
    },
    { 
      id: 3, 
      year: 1980, 
      newspaper: '동아일보', 
      date: '1980', 
      era: '산업화/군사정권',
      image: 'sin3.png', 
      x: 38, y: 32,  // 중앙 왼쪽 - 큰 글자 시작
      opacity: 0.18, 
      rotation: -1.5, 
      scale: 1.0,
      typeface: '굵은 명조, 획 간격 안정적',
      context: '언론의 왜곡과 탄압',
      driveUrl: 'https://drive.google.com/file/d/1KcLih-pvbh9O8anZKf8WajeuSxaNakxO/view?usp=drive_link'
    },
    { 
      id: 4, 
      year: 1980, 
      newspaper: '경향신문', 
      date: '1980', 
      era: '산업화/군사정권',
      image: 'sin4.png', 
      x: 42, y: 38,  // 중앙 - 겹침
      opacity: 0.22, 
      rotation: 1, 
      scale: 1.1,
      typeface: '굵은 명조, 직선적 안정감',
      context: '보수적/권위적, 정권과 긴밀한 관계',
      driveUrl: 'https://drive.google.com/file/d/1hMOSqu3_9fdtHmGFDHx7jWr0EddnZhNJ/view?usp=drive_link'
    },
    { 
      id: 5, 
      year: 1980, 
      newspaper: '매일경제', 
      date: '1980', 
      era: '산업화/군사정권',
      image: 'sin5.png', 
      x: 45, y: 42,  // 중앙 - 가장 큰 겹침
      opacity: 0.25, 
      rotation: -0.5, 
      scale: 1.2,
      typeface: '명조/고딕/혼합, 5.18 영향',
      context: '5.18 민주화운동 이후 저항 언론',
      driveUrl: 'https://drive.google.com/file/d/1NqnN06Op1dc8D84u6hcyTpUM_xqtaTJE/view?usp=drive_link'
    },
    { 
      id: 6, 
      year: 1993, 
      newspaper: '조선일보', 
      date: '1993.9.2', 
      era: '민주화~현대',
      image: 'sin6.png', 
      x: 52, y: 35,  // 중앙 오른쪽
      opacity: 0.28, 
      rotation: 2, 
      scale: 0.95,
      typeface: '세리프 헤드라인',
      context: '한글의 디지털화 진행으로 서체 개발',
      driveUrl: 'https://drive.google.com/open?id=18TdtVOGpwBC3AL0qY8Ifpi0nStMbUIYH'
    },
    { 
      id: 7, 
      year: 1997, 
      newspaper: '동아일보', 
      date: '1997.11.15', 
      era: '민주화~현대',
      image: 'sin7.png', 
      x: 55, y: 45,  // 중앙 우측 하단
      opacity: 0.30, 
      rotation: -1.5, 
      scale: 1.0,
      typeface: '명조체',
      context: '김영삼 대통령 대선 시기 당시, 신한국당과의 마찰로서 언론이 기능',
      driveUrl: 'https://drive.google.com/open?id=1j_nDb6i3aUWxuB6Ohk4D8A7cI41CRZ2H'
    },
    { 
      id: 8, 
      year: 1997, 
      newspaper: '동아일보', 
      date: '1997.11.15', 
      era: '민주화~현대',
      image: 'sin8.png', 
      x: 58, y: 40,  // 중앙 우측
      opacity: 0.32, 
      rotation: 0.5, 
      scale: 1.05,
      typeface: '산세리프 계열의 커스텀 폰트',
      context: '하나로 통신이라는 회사 로고로, 인터넷 보급이 보편화됨',
      driveUrl: 'https://drive.google.com/open?id=1KCmLPywNuFMHiPD9MJAp4RsZ8OetG1TY'
    },
    { 
      id: 9, 
      year: 1999, 
      newspaper: '경향신문', 
      date: '1999.7.20', 
      era: '민주화~현대',
      image: 'sin9.png', 
      x: 62, y: 48,  // 우측 중앙
      opacity: 0.35, 
      rotation: -2, 
      scale: 1.1,
      typeface: '굵은 명조체',
      context: '인터넷이 언론/정보 유통 채널로 본격 등장',
      driveUrl: 'https://drive.google.com/open?id=1T4dPXQj7CIt2raiSClF1OPGQik1j3ySX'
    },
    { 
      id: 10, 
      year: 2000, 
      newspaper: '오마이뉴스', 
      date: '2000', 
      era: '디지털 시대',
      image: 'sin10.png', 
      x: 15, y: 72,  // 좌하단
      opacity: 0.15, 
      rotation: 3, 
      scale: 0.85,
      typeface: '산세리프, 단순화, 균형적',
      context: '시민 기자 참여, 온라인 저널리즘 개척',
      driveUrl: null
    },
    { 
      id: 11, 
      year: 2020, 
      newspaper: '조선일보', 
      date: '2020', 
      era: '디지털 시대',
      image: 'sin11.png', 
      x: 72, y: 22,  // 우상단 - 2020년대 시작
      opacity: 0.40, 
      rotation: -1, 
      scale: 1.0,
      typeface: '굵은 고딕체(제목)/명조체(본문)',
      context: '코로나19 발생/장기화',
      driveUrl: 'https://drive.google.com/open?id=1b30tBXSyWW3Ylic5lyLfy3CXUdeBvZKH'
    },
    { 
      id: 12, 
      year: 2020, 
      newspaper: '조선일보', 
      date: '2020', 
      era: '디지털 시대',
      image: 'sin12.png', 
      x: 75, y: 28,  // 우상단 - 겹침
      opacity: 0.42, 
      rotation: 0.5, 
      scale: 1.05,
      typeface: '굵은 고딕체(제목), 명조체(본문)',
      context: '코로나19 발생/장기화',
      driveUrl: 'https://drive.google.com/open?id=1lDVAnZCSvnTrh7Hahuhb1CLeFHHAJaVD'
    },
    { 
      id: 13, 
      year: 2021, 
      newspaper: '조선일보', 
      date: '2021', 
      era: '디지털 시대',
      image: 'sin13.png', 
      x: 78, y: 32,  // 우상단 - 계속 겹침
      opacity: 0.45, 
      rotation: -0.5, 
      scale: 1.1,
      typeface: '명조체',
      context: '코로나19 장기화/백신개발',
      driveUrl: 'https://drive.google.com/open?id=1eV17aUkjQaMlcCHLOJIeAUEj0zbfQqZm'
    },
    { 
      id: 14, 
      year: 2021, 
      newspaper: '매일경제', 
      date: '2021', 
      era: '디지털 시대',
      image: 'sin14.png', 
      x: 72, y: 75,  // 우하단
      opacity: 0.40, 
      rotation: 2, 
      scale: 1.0,
      typeface: '명조체, 고딕체 혼용',
      context: '코로나19 장기화/백신개발',
      driveUrl: 'https://drive.google.com/open?id=16G945Oy8K3TO4Xbrw5gG6Jhib-vtYv-d'
    },
    { 
      id: 15, 
      year: 2021, 
      newspaper: '조선일보', 
      date: '2021', 
      era: '디지털 시대',
      image: 'sin15.png', 
      x: 76, y: 78,  // 우하단 - 겹침
      opacity: 0.43, 
      rotation: -1, 
      scale: 1.05,
      typeface: '명조체, 고딕체 혼용',
      context: '코로나19 백신접종',
      driveUrl: 'https://drive.google.com/open?id=1k-Zlgwo4l0X97vSSr6YjC04y1A4H_u-j'
    },
    { 
      id: 16, 
      year: 2025, 
      newspaper: '새로운 신', 
      date: '2025.09.16', 
      era: '창작',
      image: 'sin16.png', 
      x: 80, y: 30,  // 우상단 - 가장 진하고 최신
      opacity: 0.60, 
      rotation: 0, 
      scale: 1.15,
      typeface: '획의 굵기가 비교적 일정, 세로획 강조, 현대적 느낌',
      context: '세 명의 기록자가 모은 기록 위에서 스스로 사고하고 판단하는 새로운 신을 창조함',
      isCreated: true,  // 창작된 신 표시
      originalSource: '서울신문(2025.04.04) 윤석열 대통령 탄핵 호외를 기반으로 창작',
      driveUrl: 'https://drive.google.com/file/d/1wICUUWG3dzVyF1XZ-YmVL_pmR4kGh2Gn/view?usp=share_link'
    },
  ];

  // 기록자 인터뷰 데이터
  const interviews = [
    {
      name: '기록자 A',
      role: '리듬 분석가',
      quote: '16분음표로 박수를 치며 리듬을 체감했습니다. 하지만 기계는 1300BPM이 넘는 초고속 루프를 발견했죠. 인간의 감각과 기계의 측정 사이에는 이런 간극이 존재합니다.',
    },
    {
      name: '기록자 B',
      role: '문자 수집가',
      quote: '신문 속 \'신\'자를 수집하며 각 시대의 맥락을 읽었습니다. 같은 글자지만, 인쇄 방식, 서체, 배치가 모두 달랐어요. 글자는 시대의 지문입니다.',
    },
    {
      name: '기록자 C',
      role: '레이어 구성가',
      quote: '트레이싱지를 겹치며 과거와 현재가 동시에 존재하는 순간을 만들고 싶었습니다. 투명도는 시간의 거리이고, 겹침은 역사의 무게입니다.',
    },
  ];

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 인터뷰 탭 자동 생성 및 60초 후 제거
  useEffect(() => {
    const createInterviewTab = () => {
      const randomIndex = Math.floor(Math.random() * interviews.length);
      const tabId = Date.now();
      
      setInterviewTabs(prev => [...prev, {
        id: tabId,
        interviewIndex: randomIndex,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }]);

      // 60초 후 자동으로 탭 제거
      setTimeout(() => {
        setInterviewTabs(prev => prev.filter(tab => tab.id !== tabId));
        if (expandedTab === tabId) {
          setExpandedTab(null);
        }
      }, 60000);
    };

    // 페이지 로드 5초 후 첫 탭 생성
    const initialTimer = setTimeout(createInterviewTab, 5000);

    // 이후 30초마다 새로운 탭 생성 (선택사항)
    const intervalTimer = setInterval(createInterviewTab, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const toggleTab = (tabId) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    setInterviewTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (expandedTab === tabId) {
      setExpandedTab(null);
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#f5f5f0',
      fontFamily: '"Noto Serif KR", "Nanum Myeongjo", serif',
      color: '#1a1a1a',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        background: 'rgba(245, 245, 240, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
        <div>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '0.05em',
          }}>《신:&nbsp;&nbsp;&nbsp;》</h1>
          <p style={{
            fontSize: '0.75rem',
            margin: '0.25rem 0 0 0',
            opacity: 0.6,
            letterSpacing: '0.1em',
          }}>신문의 실제 발행 시기 : 현재 시점의 기록 시간</p>
        </div>
      </header>

      {/* Main Layer View */}
      <main style={{
          paddingTop: '120px',
          position: 'relative',
        }}>
          {/* Timeline */}
          <div style={{
            position: 'absolute',
            top: '140px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              bottom: '10px',
              fontSize: '0.75rem',
              opacity: 0.5,
            }}>1938</div>
            <div style={{
              position: 'absolute',
              right: 0,
              bottom: '10px',
              fontSize: '0.75rem',
              opacity: 0.5,
            }}>2025</div>
          </div>

          {/* Sin Layers Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {sinLayers.map((layer) => (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                style={{
                  position: 'absolute',
                  width: '400px',
                  height: '400px',
                  opacity: activeLayer === layer.id ? 0.9 : layer.opacity,
                  left: `${layer.x}%`,
                  top: `${layer.y}%`,
                  transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${(activeLayer === layer.id ? 1.1 : 1) * layer.scale})`,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: activeLayer === layer.id ? 'none' : 'blur(0.5px)',
                  mixBlendMode: 'multiply',
                  userSelect: 'none',
                  backgroundImage: `url(${layer.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ))}

            {/* Layer Info Panel */}
            {activeLayer && (
              <div style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                padding: '1.5rem',
                background: 'rgba(26, 26, 26, 0.95)',
                color: '#f5f5f0',
                borderRadius: '2px',
                maxWidth: '400px',
                animation: 'fadeIn 0.3s ease-out',
              }}>
                {(() => {
                  const layer = sinLayers.find(l => l.id === activeLayer);
                  return (
                    <>
                      <div style={{
                        fontSize: '0.7rem',
                        opacity: 0.5,
                        marginBottom: '0.5rem',
                        letterSpacing: '0.15em',
                        color: layer.isCreated ? '#a8ff60' : '#f5f5f0',
                      }}>{layer.isCreated ? '★ 창작된 신' : layer.era}</div>
                      <div style={{
                        fontSize: '0.75rem',
                        opacity: 0.6,
                        marginBottom: '0.5rem',
                        letterSpacing: '0.1em',
                      }}>기록 #{layer.id}</div>
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                      }}>{layer.newspaper}</div>
                      <div style={{
                        fontSize: '0.85rem',
                        opacity: 0.7,
                        marginBottom: '1rem',
                      }}>
                        {layer.isCreated ? '창작 일자' : '발행일'}: {layer.date}
                      </div>
                      {layer.isCreated && (
                        <div style={{
                          padding: '0.75rem',
                          marginBottom: '0.75rem',
                          background: 'rgba(168, 255, 96, 0.1)',
                          borderLeft: '2px solid #a8ff60',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                        }}>
                          {layer.originalSource}
                        </div>
                      )}
                      <div style={{
                        padding: '0.75rem 0',
                        borderTop: '1px solid rgba(245, 245, 240, 0.2)',
                        marginBottom: '0.75rem',
                      }}>
                        <div style={{
                          fontSize: '0.7rem',
                          opacity: 0.5,
                          marginBottom: '0.25rem',
                          letterSpacing: '0.1em',
                        }}>서체 특징</div>
                        <div style={{
                          fontSize: '0.85rem',
                          lineHeight: '1.5',
                        }}>{layer.typeface}</div>
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        lineHeight: '1.6',
                        opacity: 0.8,
                        fontStyle: layer.isCreated ? 'normal' : 'italic',
                        fontWeight: layer.isCreated ? 600 : 400,
                      }}>{layer.context}</div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Audio Player */}
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            background: 'rgba(26, 26, 26, 0.95)',
            color: '#f5f5f0',
            borderRadius: '2px',
          }}>
            <Volume2 size={18} style={{ opacity: 0.6 }} />
            <div style={{
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
            }}>그리드쉬프트</div>
            <button
              onClick={toggleAudio}
              style={{
                background: 'none',
                border: '1px solid rgba(245, 245, 240, 0.3)',
                color: '#f5f5f0',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <audio ref={audioRef} loop>
              <source src="/path-to-gridshift.mp3" type="audio/mpeg" />
            </audio>
          </div>

          {/* Description */}
          <div style={{
            maxWidth: '800px',
            margin: '4rem auto',
            padding: '0 2rem',
            lineHeight: '1.8',
            fontSize: '0.95rem',
            opacity: 0.8,
          }}>
            <p>
              그 신은 아주 오래전부터 있었다. 기록자들은 그리드쉬프트를 보도로, 리듬을 사건으로 바라본다. 
              신문은 사건 흐름을 단순화하여 압축한다. 《신:   》은 '신문의 실제 발행 시기: 그 신을 현재 시점의 
              기록자들이 기록한 시간'을 보여주며, 오늘의 시대에 어울리는 또 다른 신의 형태를 제안하고자 한다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              네 장의 트레이싱지와 그 위에 새로운 신을 기록한 한 장의 트레이싱지를 스캔하여 겹쳐 놓은 이미지는, 
              기록의 물리적 흔적과 시간의 감각을 디지털 화면 위에 드러낸다.
            </p>
            <p style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(168, 255, 96, 0.05)',
              borderLeft: '3px solid rgba(168, 255, 96, 0.5)',
              fontWeight: 600,
            }}>
              이 사건을 다른 방식으로 기록하고, 신문처럼 한 지면에 압축하기 위해 세 명의 기록자가 
              신들의 문(文)을 기록했다. 그렇게 모인 기록 위에서 스스로 사고하고 판단하는 
              <strong style={{ color: '#a8ff60' }}> 새로운 '신'을 창조</strong>하며, 
              오늘의 시대에 어울리는 또 다른 신의 형태를 제안하고자 한다.
            </p>
          </div>
        </main>

      {/* Interview Tabs - 우측 하단에 쌓이는 형태 */}
      <div style={{
        position: 'fixed',
        bottom: '6rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 1500,
        maxHeight: '60vh',
        overflowY: 'auto',
      }}>
        {interviewTabs.map((tab, index) => {
          const interview = interviews[tab.interviewIndex];
          const isExpanded = expandedTab === tab.id;
          
          return (
            <div
              key={tab.id}
              onClick={() => toggleTab(tab.id)}
              style={{
                background: 'rgba(26, 26, 26, 0.95)',
                color: '#f5f5f0',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: isExpanded ? '400px' : '280px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                animation: 'slideIn 0.4s ease-out',
              }}
            >
              {/* Tab Header */}
              <div style={{
                padding: '1rem',
                borderBottom: isExpanded ? '1px solid rgba(245, 245, 240, 0.2)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.7rem',
                    opacity: 0.5,
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}>
                    {tab.timestamp}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}>
                    {interview.name}
                  </div>
                  {!isExpanded && (
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.6,
                      marginTop: '0.25rem',
                    }}>
                      {interview.role}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f5f5f0',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    opacity: 0.5,
                    transition: 'opacity 0.3s',
                    padding: '0.25rem',
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.5'}
                >
                  ×
                </button>
              </div>

              {/* Tab Content - 확장 시만 표시 */}
              {isExpanded && (
                <div style={{
                  padding: '1rem',
                  animation: 'fadeIn 0.3s ease-out',
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.6,
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}>
                    {interview.role}
                  </div>
                  <blockquote style={{
                    margin: 0,
                    padding: '1rem 0',
                    lineHeight: '1.7',
                    fontSize: '0.9rem',
                    borderTop: '1px solid rgba(245, 245, 240, 0.2)',
                    borderBottom: '1px solid rgba(245, 245, 240, 0.2)',
                  }}>
                    "{interview.quote}"
                  </blockquote>
                  <div style={{
                    marginTop: '1rem',
                    fontSize: '0.65rem',
                    opacity: 0.4,
                    textAlign: 'right',
                    letterSpacing: '0.1em',
                  }}>
                    60초 후 자동 삭제
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Grid Shift Analysis Section */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
      }}>
        <div style={{
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.5)',
          borderLeft: '3px solid #1a1a1a',
          marginBottom: '2rem',
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '1rem',
            letterSpacing: '0.02em',
          }}>그리드쉬프트 분석</h3>
          <p style={{
            lineHeight: '1.8',
            opacity: 0.8,
            fontSize: '0.95rem',
          }}>
            작업자들은 '그리드쉬프트.mp3'를 보도로, 리듬을 사건으로 바라본다. 한 작업자는 16분음표로 
            박수를 치며 리듬을 체감했지만, 기계 분석에서는 1300BPM이 넘는 초고속 루프가 드러났다. 
            신문 또한 현실의 사건 흐름을 단순화하여 독자가 이해하기 쉬운 단위로 압축한다.
          </p>
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                인간의 감각
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>16분음표</div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                기계의 측정
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1300+ BPM</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes messagePopup {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        * {
          box-sizing: border-box;
        }

        button {
          font-family: 'Noto Serif KR', 'Nanum Myeongjo', serif;
        }
      `}</style>
    </div>
  );
};

export default SinNewspaperArchive;