
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/base/Button';
import Card from '../../../components/base/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 로그인 로직 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직
    console.log('카카오 로그인');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => navigate('/onboarding')}
          className="w-10 h-10 flex items-center justify-center"
        >
          <i className="ri-arrow-left-line text-text text-xl" />
        </button>
        <button 
          onClick={() => navigate('/auth/signup')}
          className="text-primary font-sf font-medium"
        >
          회원가입
        </button>
      </div>

      <div className="flex-1 px-4 flex flex-col justify-center space-y-8">
        {/* 로고 */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Pacifico, serif' }}>
              ND
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'Pacifico, serif' }}>
              NearDeal
            </h1>
            <p className="text-text-secondary font-sf">
              내 주변 최고의 딜을 찾아보세요
            </p>
          </div>
        </div>

        {/* 로그인 폼 */}
        <Card>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-sf font-medium text-text">이메일</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className="w-full p-4 pl-12 border border-gray-200 rounded-12 focus:border-primary focus:outline-none font-sf text-sm"
                    required
                  />
                  <i className="ri-mail-line absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-sf font-medium text-text">비밀번호</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-12 focus:border-primary focus:outline-none font-sf text-sm"
                    required
                  />
                  <i className="ri-lock-line absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  >
                    <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button className="text-sm text-text-secondary font-sf">
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </Card>

        {/* 소셜 로그인 */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-text-secondary font-sf">또는</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleKakaoLogin}
            className="bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-500"
          >
            <i className="ri-chat-3-fill mr-2" />
            카카오로 로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
